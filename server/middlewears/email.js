const nodemailer = require('nodemailer');
require('dotenv').config()

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'exotelhotel2@gmail.com',
      pass: process.env.EMAIL_AUTH,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const sendEmail=(destination,content,subject)=>{
    transporter.sendMail({
        from: 'exotelhotel2@gmail.com',
        to: destination,
        subject: subject,
        html: content,
      }, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
  }

  module.exports = sendEmail;