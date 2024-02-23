const AdminModel = require("../models/admin");
const PastAdminModel = require("../models/pastAdmin");
const OtpModel = require("../models/otp");
const bcrypt = require("bcryptjs");
const { createToken } = require("./authController");

const getAllAdmins = async (req, res) => {
  try {
    const admins = await AdminModel.find();
    res.status(200).json(admins);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAdmin = async (req, res) => {
  try {
    const { employeeId } = req.params;
    if (!employeeId)
      return res.status(404).json({ error: "Missing employee ID" });
    const admin = await AdminModel.findOne({
      employeeId: employeeId,
    });
    if (!admin) return res.status(404).json({ error: "Admin not found" });

    const { userAccount, _id } = admin;
    const { username, profilepic } = userAccount;
    const userDetails = {
      _id,
      email,
      username,
      profilepic,
    };

    res
      .status(200)
      .json({ userDetails, message: "Admin Account Retrieved successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createAdmin = async (req, res) => {
  const { otp, ...adminDetails } = req.body;
  try {
    //verify otp
    const otpHolder = await OtpModel.find({ email: adminDetails.email });
    if (otpHolder.length === 0)
      return res.status(400).json({ error: "Expired OTP" });
    const lastOtp = otpHolder[otpHolder.length - 1];
    const validOtp = await bcrypt.compare(otp, lastOtp.otp);

    if (lastOtp.email === adminDetails.email && validOtp) {
      const hashedPassword = await bcrypt.hash(
        adminDetails.userAccount.password,
        10
      );
      const user = await AdminModel.create({
        ...adminDetails,
        userAccount: { ...adminDetails.userAccount, password: hashedPassword },
      });
      const otpDelete = await OtpModel.deleteMany({
        email: lastOtp.email,
      });
      const token = createToken(user._id, "3d");
      return res
        .status(201)
        .json({ token, message: "Admin Registration Successful" });
    }
    return res.status(400).json({ error: "Invalid OTP" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteAccount = async (req, res) => {
  const { id } = req.body;
  try {
    const removedAdmin = await AdminModel.findByIdAndDelete(id);
    if (!removedAdmin)
      return res.status(404).json({ error: "Admin not found" });
    const { NIC, phoneNumber, email } = removedAdmin.toObject();
    const pastAdminData = { NIC, phoneNumber, email };
    await PastAdminModel.create(pastAdminData);
    res.status(200).json({ message: "Admin removed successfully" });
  } catch (error) {
    res.status(201).json({ error: error });
  }
};

module.exports = { getAllAdmins, getAdmin, createAdmin, deleteAccount };
