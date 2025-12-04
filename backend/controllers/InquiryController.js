const Inquiry = require("../models/Inquiry");
const formData = require("form-data");
const Mailgun = require("mailgun.js");

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
    if (process.env.MAILGUN_API_KEY && process.env.MAILGUN_DOMAIN && process.env.ADMIN_EMAIL) {
      // Send admin notification email in background
      sendAdminNotificationEmail(name, email, phone, message, inquiry._id).catch(err => {
        // Already logged in sendAdminNotificationEmail
      });
    } else {
      console.warn("⚠️  Mailgun credentials not configured. Skipping email notification.");
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

// Send admin notification email (runs in background)
async function sendAdminNotificationEmail(name, email, phone, message, inquiryId) {
  try {
    console.log("📧 Attempting to send ADMIN notification email via Mailgun...");

    // Get Mailgun credentials
    const apiKey = process.env.MAILGUN_API_KEY?.trim();
    const domain = process.env.MAILGUN_DOMAIN?.trim();
    const adminEmail = process.env.ADMIN_EMAIL?.trim();
    const fromEmail = process.env.MAILGUN_FROM_EMAIL?.trim() || `noreply@${domain}`;

    if (!apiKey || !domain || !adminEmail) {
      throw new Error("Mailgun credentials not properly configured. Required: MAILGUN_API_KEY, MAILGUN_DOMAIN, ADMIN_EMAIL");
    }

    // Get region (US or EU) - default to US
    const region = process.env.MAILGUN_REGION?.trim()?.toLowerCase() || "us";

    console.log("📧 Mailgun config:", { domain, fromEmail, adminEmail, region });

    // Initialize Mailgun client
    const mailgun = new Mailgun(formData);
    const mg = mailgun.client({
      username: "api",
      key: apiKey
    });

    // Set region if EU (default is US)
    if (region === "eu") {
      mg.setRegion("eu");
      console.log("🌍 Using Mailgun EU region");
    } else {
      console.log("🇺🇸 Using Mailgun US region (default)");
    }

    // Escape all user input to prevent XSS attacks in emails
    const escapedName = escapeHtml(name);
    const escapedEmail = escapeHtml(email);
    const escapedPhone = escapeHtml(phone);
    const escapedMessage = escapeHtml(message);

    // Build email HTML content
    const htmlContent = `
      <h2>New Inquiry (ID: ${inquiryId})</h2>
      <p><strong>Name:</strong> ${escapedName}</p>
      <p><strong>Email:</strong> ${escapedEmail}</p>
      <p><strong>Phone:</strong> ${escapedPhone}</p>
      <p><strong>Message:</strong> ${escapedMessage}</p>
      <hr>
      <p><small>Received at: ${new Date().toLocaleString()}</small></p>
    `;

    // Prepare message data - Mailgun accepts 'to' as string (better compatibility)
    const messageData = {
      from: `"Writewell Academy" <${fromEmail}>`,
      to: adminEmail, // String format (can also use array, but string is more reliable)
      subject: "New Inquiry Received",
      html: htmlContent
    };

    console.log("📤 Sending email via Mailgun...", { from: messageData.from, to: messageData.to });

    // Send email with timeout
    const emailPromise = mg.messages.create(domain, messageData);

    const info = await Promise.race([
      emailPromise,
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Email timeout after 15 seconds")), 15000)
      )
    ]);

    // Mailgun response format: { id: "...", message: "Queued. Thank you." }
    console.log("✅ Admin notification email sent successfully via Mailgun!", {
      messageId: info.id || info.message,
      status: info.status,
      response: info
    });

  } catch (emailError) {
    // Enhanced error logging for Mailgun-specific errors
    let errorDetails = {
      message: emailError.message,
      name: emailError.name
    };

    // Extract Mailgun API error details
    if (emailError.status || emailError.statusCode) {
      errorDetails.status = emailError.status || emailError.statusCode;
    }

    if (emailError.details) {
      errorDetails.details = emailError.details;
    }

    // Try to extract response body for more context
    if (emailError.response) {
      errorDetails.responseStatus = emailError.response.status;
      errorDetails.responseBody = emailError.response.body || emailError.response.data;
    }

    if (emailError.body) {
      errorDetails.body = emailError.body;
    }

    console.error("⚠️  Admin notification email failed (inquiry saved successfully):", errorDetails);

    // Log specific error messages for common issues
    if (emailError.message?.includes("Forbidden") || emailError.status === 401 || emailError.status === 403) {
      console.error("🔐 Mailgun Authentication Error: Check your API key is correct");
    } else if (emailError.message?.includes("Domain") || emailError.status === 404) {
      console.error("🌐 Mailgun Domain Error: Check your domain configuration and that it's verified");
    } else if (emailError.message?.includes("timeout")) {
      console.error("⏱️  Mailgun Timeout: Request took too long, but this shouldn't affect your database save");
    } else if (emailError.message?.includes("Unauthorized")) {
      console.error("🔑 Mailgun Unauthorized: Verify your API key and domain settings");
    }
  }
}
