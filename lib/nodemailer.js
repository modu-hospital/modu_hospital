const nodemailer = require('nodemailer');
require('dotenv').config();
const env = process.env;

module.exports = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail=.com',
    port: 587,
    secure: false,
    auth: {
        user: 'spartamoduhospital@gmail.com',
        pass: env.GOOGLE_MAIL_PASS,
    },
});
