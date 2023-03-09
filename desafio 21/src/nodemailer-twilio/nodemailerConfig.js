const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();

//Transporter de nodemailer
const transporter = nodemailer.createTransport({
    service: "gmail",
   
   
    auth: {
        user: "correotestcoder@gmail.com",
        pass: "mxnkjgicitsitzqq"
    }
  });

  module.exports = transporter;