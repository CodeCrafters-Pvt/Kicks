const md5 = require("crypto-js/md5");
require("dotenv").config();

const generateHash = (orderId, amount) => {
  const merchantSecret = process.env.MERCHANT_SECRET;
  const merchantId = process.env.MERCHANT_ID;
  const hashedSecret = md5(merchantSecret).toString().toUpperCase();
  const amountFormated = parseFloat(amount)
    .toLocaleString("en-us", { minimumFractionDigits: 2 })
    .replaceAll(",", "");
  const currency = "LKR";
  const hash = md5(
    merchantId + orderId + amountFormated + currency + hashedSecret
  )
    .toString()
    .toUpperCase();
  return hash;
};

module.exports = generateHash;
