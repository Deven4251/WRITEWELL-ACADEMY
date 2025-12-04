const Inquiry = require("../models/Inquiry");
const nodemailer = require("nodemailer");

// HTML escape function to prevent XSS in emails
function escapeHtml(text) {
  if (!text) return '';
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return String(text).replace(/[&<>"']/g, m => map[m]);
}

exports.handleInquiry = async (req, res) => {
  try {
    console.log("📥 Inquiry endpoint hit!");
    console.log("Request method:", req.method);
    console.log("Request body:", req.body);
    console.log("Request headers:", req.headers);

    const { name, email, phone, message } = req.body;

    console.log("📥 Extracted data:", { name, email, phone, message: message?.substring(0, 50) });

    // Validate required fields
    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        ok: false,
        error: "All fields are required (name, email, phone, message)"
      });
    }

    // Check MongoDB connection
    const mongoose = require("mongoose");
    if (mongoose.connection.readyState !== 1) {
      console.error("❌ MongoDB not connected. State:", mongoose.connection.readyState);
      return res.status(503).json({
        ok: false,
        error: "Database connection unavailable. Please try again later."
      });
    }

    // Save inquiry to database
    console.log("💾 Saving inquiry to database...");
    const inquiry = await Inquiry.create({ name, email, phone, message });
    console.log("✅ Inquiry saved successfully:", inquiry._id);

    // Send email asynchronously (don't wait for it - return response immediately)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.ADMIN_EMAIL) {
      // Send email in background (fire and forget)
      sendEmailAsync(name, email, phone, message, inquiry._id).catch(err => {
        // Already logged in sendEmailAsync
      });
    } else {
      console.warn("⚠️  Email credentials not configured. Skipping email notification.");
    }

    // Return response immediately (don't wait for email)
    return res.json({ ok: true, inquiry, message: "Inquiry submitted successfully" });
  } catch (err) {
    console.error("❌ Inquiry Error:", err);
    console.error("Error details:", {
      message: err.message,
      stack: err.stack,
      name: err.name
    });

    // Provide more specific error messages
    let errorMessage = "Server error while submitting inquiry";
    if (err.name === "ValidationError") {
      errorMessage = "Validation error: " + Object.values(err.errors).map(e => e.message).join(", ");
    } else if (err.code === 11000) {
      errorMessage = "Duplicate entry detected";
    } else if (err.message) {
      errorMessage = err.message;
    }

    return res.status(500).json({
      ok: false,
      error: errorMessage
    });
  }
};

// Async email sending function (runs in background)
async function sendEmailAsync(name, email, phone, message, inquiryId) {
  try {
    console.log("📧 Attempting to send notification email...");

    // Create transporter with timeout settings
    // Trim and remove spaces from email password (Gmail App Passwords shouldn't have spaces)
    const emailUser = process.env.EMAIL_USER?.trim();
    const emailPass = process.env.EMAIL_PASS?.trim()?.replace(/\s+/g, '');

    if (!emailUser || !emailPass) {
      throw new Error("Email credentials not properly configured");
    }

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: emailUser,
        pass: emailPass
      },
      tls: {
        rejectUnauthorized: false,
        minVersion: "TLSv1.2"
      },
      // Timeout settings for Render
      connectionTimeout: 10000, // 10 seconds
      socketTimeout: 10000, // 10 seconds
      greetingTimeout: 10000, // 10 seconds
      // Retry logic
      pool: true,
      maxConnections: 1,
      maxMessages: 3
    });

    // Escape all user input to prevent XSS attacks in emails
    const escapedName = escapeHtml(name);
    const escapedEmail = escapeHtml(email);
    const escapedPhone = escapeHtml(phone);
    const escapedMessage = escapeHtml(message);

    // Send email with timeout (verify happens automatically on send)
    const mailOptions = {
      from: `"Writewell Academy" <${emailUser}>`,
      to: process.env.ADMIN_EMAIL?.trim(),
      subject: "New Inquiry Received",
      html: `
        <h2>New Inquiry (ID: ${inquiryId})</h2>
        <p><strong>Name:</strong> ${escapedName}</p>
        <p><strong>Email:</strong> ${escapedEmail}</p>
        <p><strong>Phone:</strong> ${escapedPhone}</p>
        <p><strong>Message:</strong> ${escapedMessage}</p>
        <hr>
        <p><small>Received at: ${new Date().toLocaleString()}</small></p>
      `
    };

    const info = await Promise.race([
      transporter.sendMail(mailOptions),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Email timeout after 15 seconds")), 15000)
      )
    ]);

    console.log("✅ Email sent successfully! Message ID:", info.messageId);

  } catch (emailError) {
    // Log detailed error but don't throw (don't affect main request)
    console.error("⚠️  Email sending failed (inquiry saved successfully):", {
      message: emailError.message,
      code: emailError.code,
      command: emailError.command,
      responseCode: emailError.responseCode
    });

    // Optionally log to database or external service for monitoring
    console.log("💡 Tip: Consider using a transactional email service (SendGrid, Mailgun) for better reliability on Render");
  }
}
