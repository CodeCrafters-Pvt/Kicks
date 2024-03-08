const express = require('express');
const {generatePaymentConfig} =require("../controllers/paymentController")

const router=express.Router();

router.post("/config",generatePaymentConfig);


module.exports = router; 