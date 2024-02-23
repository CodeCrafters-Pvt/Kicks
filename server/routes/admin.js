const express = require("express");
const requireAuth = require("../middlewears/requireAuth");
const {
  getAllAdmins,
  getAdmin,
  createAdmin,
  deleteAccount,
} = require("../controllers/adminController");

const router=express.Router();


router.get("/all",requireAuth,getAllAdmins);
router.get("/:employeeId",requireAuth,getAdmin);
router.post("/signup",createAdmin);
router.delete("/",requireAuth,deleteAccount);

module.exports = router;