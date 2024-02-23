const userModel = require("../models/user");
const adminModel = require("../models/admin");
const OtpModel= require('../models/otp')
const sendEmail = require("../middlewears/email");
const otpGenerator = require('otp-generator')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const createToken = (_id, expiry) => {
  return jwt.sign({ _id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: expiry,
  });
};

//login
const login = async (req, res,model) => {
  try {
    const cookies = req.cookies;
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(404).json({ error: "Missing Credentials" });

    const user = await model.findOne({ email });

    if (!user)
      return res.status(404).json({ error: "User not found" });

    const match = await bcrypt.compare(password, user.userAccount.password);
    if (!match) return res.status(401).json({ error: "Incorrect Password" });

    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: user.userAccount.username,
          role: user.role,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "20m" }
    );

    const newRefreshToken = jwt.sign(
      { username: user.userAccount.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "3d" }
    );

    let newRefreshTokenArray = !cookies?.jwt
      ? user.refreshToken
      : user.refreshToken.filter((rt) => rt !== cookies.jwt);

    if (cookies?.jwt) {
      const refreshToken = cookies.jwt;
      const foundToken = await model.findOne({ refreshToken }).exec();

      if (!foundToken) {
        newRefreshTokenArray = [];
      }
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
    }

    user.refreshToken = [...newRefreshTokenArray, newRefreshToken];
    const result = await user.save();

    res.cookie("jwt", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    const { userAccount, _id, role, isPremium, isActive } = user;
    const { username, profilepic } = userAccount;
    const userDetails = {
      _id,
      role,
      email,
      username,
      profilepic,
      isPremium,
      isActive,
    };
    res.status(200).json({
      user: userDetails,
      email,
      token: accessToken,
      message: "Login Successful",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const userLogin = async (req, res) => {
  await login(req, res, userModel);
};

const adminLogin = async (req, res) => {
  await login(req, res, adminModel);
};


//logout
const logout = async (req, res,model) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;

  const user = await model.findOne({ refreshToken }).exec();
  if (!user) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204);
  }

  // Delete refreshToken in db
  user.refreshToken = user.refreshToken.filter((rt) => rt !== refreshToken);
  const result = await user.save();
  console.log(result);

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.sendStatus(204);
};

const userLogout = async (req, res) => {
  await logout(req, res, userModel);
};

const adminLogout = async (req, res) => {
  await logout(req, res, adminModel);
};



//request reset password
const requestResetPassword = async (req, res,model) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Missing Credentials" });
    const user = await model.findOne({ email });
    if (!user)
      return res.status(404).json({ error: "User not found" });

    const resetToken = createToken(user._id, "1d");
    const sanitizedToken = resetToken.replace(/\./g, "-");
    user.resetToken = sanitizedToken;
    await user.save();

    const EmailContent = `
        <h3>Reset Password</h3>
        <p>Click <a href="http://localhost:3000/reset-password/${sanitizedToken}"> here</a> to reset your password.</p>`;
    sendEmail(email, EmailContent, "Password Reset");
    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const userRequestResetPassword = async (req, res) => {
  await requestResetPassword(req, res, userModel);
};

const adminRequestResetPassword = async (req, res) => {
  await requestResetPassword(req, res, adminModel);
};



//reset password
const resetPassword = async (req, res,model) => {
  try {
    const { resetToken, newPassword } = req.body;
    if (!resetToken || !newPassword)
      return res.status(400).json({ error: "Missing Credentials" });
    const user = await model.findOne({ resetToken });
    if (!user)
      return res.status(400).json({ error: "Invalid or expired token" });
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.userAccount.password = hashedPassword;
    user.resetToken = null;
    await user.save();
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const userResetPassword = async (req, res) => {
  await resetPassword(req, res, userModel);
};

const adminResetPassword = async (req, res) => {
  await resetPassword(req, res, adminModel);
};


//send OTP
const sendOtp = async (req,res,model)=>{
  const {email,userName} =req.body;
  try{
      if(!email || !userName) return res.status(400).json({error:"Missing Credentials"})
      //check if credentials are already taken
      const existingUserName=await model.findOne({"userAccount.username":userName});
      const existingUserEmail=await model.findOne({email:email});
      if(existingUserName && existingUserEmail)  return res.status(409).json({error:"Username and E-mail already exists"});
      if(existingUserName)  return res.status(409).json({error:"Username already exists"});
      if(existingUserEmail)  return res.status(409).json({error:"E-mail already exists"});

      //store and send Otp through e-mail
      const OTP = otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });
      const EmailContent = `<h3>Your OTP for verification</h3>
                            <h1> ${OTP} </h1>`;
      sendEmail(email,EmailContent,"OTP Verification");
      const hashedOTP= await bcrypt.hash(OTP,10);
      const savedOTP= await OtpModel.create({
          otp:hashedOTP,
          email:email,
      })
      res.status(200).json({message:"OTP sent successfully"})
  }
  catch(error){
      res.status(400).json({error:error.message})
  }
}

const userSendOtp = async (req, res) => {
  await sendOtp(req, res, userModel);
};

const adminSendOtp = async (req, res) => {
  await sendOtp(req, res, adminModel);
};


module.exports = {
  createToken,
  userLogin,
  adminLogin,
  userRequestResetPassword,
  adminRequestResetPassword,
  userResetPassword,
  adminResetPassword,
  userLogout,
  adminLogout,
  userSendOtp,
  adminSendOtp
};
