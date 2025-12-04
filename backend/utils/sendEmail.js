const formData = require("form-data");
const Mailgun = require("mailgun.js");

module.exports = async function sendEmail({ to, subject, html, attachments }) {
    const apiKey = process.env.MAILGUN_API_KEY?.trim();
    const domain = process.env.MAILGUN_DOMAIN?.trim();
    const fromEmail = process.env.MAILGUN_FROM_EMAIL?.trim() || `noreply@${domain}`;

    if (!apiKey || !domain) {
        throw new Error("Mailgun credentials not configured. Required: MAILGUN_API_KEY, MAILGUN_DOMAIN");
    }

    // Initialize Mailgun client
    const mailgun = new Mailgun(formData);
    const mg = mailgun.client({
        username: "api",
        key: apiKey
    });

    const messageData = {
        from: fromEmail,
        to: Array.isArray(to) ? to : [to],
        subject,
        html
    };

    // Add attachments if provided
    if (attachments && attachments.length > 0) {
        // Mailgun handles attachments differently - they need to be added as files
        // This is a simplified version - for complex attachments, use Mailgun's attachment API
        console.warn("Attachments feature may need additional implementation for Mailgun");
    }

    return mg.messages.create(domain, messageData);
};
