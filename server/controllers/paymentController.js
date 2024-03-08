const generateHash=require("../middlewears/generateHash")
require("dotenv").config();

const generatePaymentConfig=async (req,res)=>{
    try{
        const orderDetails=req.body
        const paymentConfig = {
            "sandbox": true,
            "merchant_id":process.env.MERCHANT_ID , 
            "return_url": "http://localhost:3000/", 
            "cancel_url": "http://localhost:3000/",
            "notify_url": "http://sample.com/notify",
            "order_id": orderDetails.id,
            "items": orderDetails.items,
            "amount": orderDetails.amount,
            "currency": "LKR",
            "hash":generateHash(orderDetails.id,orderDetails.amount), 
            "first_name": orderDetails.firstName,
            "last_name": orderDetails.lastName,
            "email": orderDetails.email,
            "phone": orderDetails.phone,
            "address": orderDetails.address,
            "city": orderDetails.city,
            "country": orderDetails.country,
        };
        res.status(200).json(paymentConfig);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports={generatePaymentConfig}