
const twilio = require("twilio");
const dotenv = require("dotenv").config();


//Configuracion TWILIO
const accountSid = "ACac49f36d021f5d36746645f20776af11";
const authToken = "ed511ff2367e2f29bcf1280f905f2eb2";

const twilioClient = twilio(accountSid, authToken);

module.exports = twilioClient;