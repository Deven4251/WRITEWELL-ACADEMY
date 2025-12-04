const Inquiry = require("../models/Inquiry");
const nodemailer = require("nodemailer");

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

    // Send email (non-blocking - don't fail if email fails)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.ADMIN_EMAIL) {
      try {
        console.log("📧 Sending notification email...");
        let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          },
          tls: {
            rejectUnauthorized: false
          }
        });

        await transporter.sendMail({
          from: `"Writewell Academy" <${process.env.EMAIL_USER}>`,
          to: process.env.ADMIN_EMAIL,
          subject: "New Inquiry Received",
          html: `
            <h2>New Inquiry</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Message:</strong> ${message}</p>
          `
        });
        console.log("✅ Email sent successfully!");
      } catch (emailError) {
        // Log email error but don't fail the request
        console.error("⚠️  Email sending failed (inquiry still saved):", emailError.message);
      }
    } else {
      console.warn("⚠️  Email credentials not configured. Skipping email notification.");
    }

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
