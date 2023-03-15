const nodemailer = require('nodemailer');

module.exports = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail=.com',
    port: 587,
    secure: false,
    auth: {
        user: 'spartamoduhospital@gmail.com',
        pass: 'mmqfyektdcjhtpav',
    },
});
