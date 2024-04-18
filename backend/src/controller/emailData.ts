const express = require("express");
const router = express.Router();
import { EmailData } from '../model/emailData';
const sendMail = require("../utils/sendMail");

// send email
router.post("/send-email", async (req: any, res: any) => {
  try {
    const {email_to, description, subject, } = req.body;
    // Check if email_from is null, if so, use process.env.smtp_mail
    const emailData = await EmailData.create({       
      email_to: email_to, 
      description: description, 
      subject: subject
    });

    sendMail({
      from: process.env.SMTP_MAIL,
      to: email_to,
      subject: "Hi, Salam Kenal",
      message: description,
    });

    res.status(201).json({ emailData });
  } catch (error: any) {
    console.log(error);

    res.status(400).json({
      status: 400,
      message: error.message.toString(),
    });
  }
});

// get all data show only email
router.get("/get-email", async (req: any, res: any) => {
  try {
    const data = await EmailData.find({}).select('email_to');

    // return data:
    res.status(200).json({ data });
    // res.status(200).json({ emailData });
  } catch (error: any) {
    console.log(error);

    res.status(400).json({
      status: 400,
      message: error.message.toString(),
    });
  }
});

module.exports = router;