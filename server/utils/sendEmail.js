const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async ({ email, subject, message }) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        await transporter.sendMail({
            from: "BookWarm",
            to: email,
            subject,
            html: message,
        });
    } catch (error) {
        throw new Error("Failed to send email.");
    }
};

module.exports = { sendEmail };