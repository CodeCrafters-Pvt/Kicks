const express = require("express");
const router = express.Router();
const {
  userLogin,
  adminLogin,
  userRequestResetPassword,
  adminRequestResetPassword,
  userResetPassword,
  adminResetPassword,
  userLogout,
  adminLogout,
  userSendOtp,
  adminSendOtp,
} = require("../controllers/authController");

router.post("/login/user", userLogin);
router.post("/login/admin", adminLogin);
router.post("/logout/user", userLogout);
router.post("/logout/admin", adminLogout);
router.post("/request-reset-password/user", userRequestResetPassword);
router.post("/request-reset-password/admin", adminRequestResetPassword);
router.post("/reset-password/user", userResetPassword);
router.post("/reset-password/admin", adminResetPassword);
router.post("/request-otp/user", userSendOtp);
router.post("/request-otp/admin", adminSendOtp);

module.exports = router;
