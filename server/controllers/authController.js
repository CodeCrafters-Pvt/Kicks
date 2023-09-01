const userModel = require("../models/user");
const adminModel = require("../models/admin");
const sendEmail = require("../middlewears/email");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const createToken = (_id, expiry) => {
  return jwt.sign({ _id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: expiry,
  });
};

const login = async (req, res) => {
  try {
    const cookies = req.cookies;
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Missing Credentials" });

    const user = await userModel.findOne({ email });
    const admin = await adminModel.findOne({ email });

    if (!user && !admin)
      return res.status(401).json({ error: "User not found" });

    var account;

    if (user) account = user;
    if (admin) account = admin;

    const match = await bcrypt.compare(password, account.userAccount.password);
    if (!match) return res.status(400).json({ error: "Incorrect Password" });

    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: account.userAccount.username,
          role: account.role,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10s" }
    );

    const newRefreshToken = jwt.sign(
      { username: account.userAccount.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "15s" }
    );

    let newRefreshTokenArray = !cookies?.jwt
      ? account.refreshToken
      : account.refreshToken.filter((rt) => rt !== cookies.jwt);

    if (cookies?.jwt) {
      const refreshToken = cookies.jwt;
      const foundToken = await userModel.findOne({ refreshToken }).exec();

      if (!foundToken) {
        newRefreshTokenArray = [];
      }
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
    }

    account.refreshToken = [...newRefreshTokenArray, newRefreshToken];
    const result = await account.save();

    res.cookie("jwt", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    const { userAccount, _id, role, isPremium, isActive } = account;
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

const logout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;

  const user = await userModel.findOne({ refreshToken }).exec();
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

const requestResetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Missing Credentials" });
    const user = await userModel.findOne({ email });
    const admin = await adminModel.findOne({ email });
    if (!user && !admin)
      return res.status(404).json({ error: "User not found" });
    var account;
    if (user) account = user;
    if (admin) account = admin;

    const resetToken = createToken(account._id, "1d");
    const sanitizedToken = resetToken.replace(/\./g, "-");
    account.resetToken = sanitizedToken;
    await account.save();

    const EmailContent = `
        <h3>Reset Password</h3>
        <p>Click <a href="http://localhost:3000/reset-password/${sanitizedToken}"> here</a> to reset your password.</p>`;
    sendEmail(email, EmailContent, "Password Reset");
    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;
    if (!resetToken || !newPassword)
      return res.status(400).json({ error: "Missing Credentials" });
    const user = await userModel.findOne({ resetToken });
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

module.exports = {
  createToken,
  login,
  requestResetPassword,
  resetPassword,
  logout,
};
