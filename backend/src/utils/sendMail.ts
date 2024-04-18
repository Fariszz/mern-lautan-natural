const nodemailer = require("nodemailer");

require('dotenv').config({
path: '/src/config/.env',
});

const sendMail = async (options: any) => {    
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,        
        auth:{
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: options.to,
        subject: options.subject,
        text: options.message,
    };
    
    await transporter.sendMail(mailOptions);
};

module.exports = sendMail;