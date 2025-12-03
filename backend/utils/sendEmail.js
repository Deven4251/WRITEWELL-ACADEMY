const nodemailer = require("nodemailer");

module.exports = async function sendEmail({ to, subject, html, attachments }) {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // MUST be false for port 587
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        tls: {
            minVersion: "TLSv1.2" // Gmail requires TLS 1.2+
        }
    });

    return transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        html,
        attachments
    });
};
