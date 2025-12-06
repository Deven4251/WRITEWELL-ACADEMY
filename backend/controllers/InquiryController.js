const nodemailer = require("nodemailer");
const generateReceiptPDF = require("../generateReceiptPDF");

exports.handleInquiry = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.json({ ok: false, error: "All fields are required" });
    }

    const inquiryId = Date.now().toString();

    // Generate PDF buffer (Render filesystem is read-only)
    const pdfBuffer = await generateReceiptPDF({
      name,
      email,
      phone,
      message,
      inquiryId
    });

    // EMAIL TRANSPORTER
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // SEND EMAIL TO ADMIN
    await transporter.sendMail({
      from: `"Writewell Academy" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Inquiry from ${name}`,
      html: `
        <h2>New Inquiry</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Message:</b> ${message}</p>
      `,
      attachments: [
        {
          filename: `Inquiry-${inquiryId}.pdf`,
          content: pdfBuffer,
          contentType: "application/pdf"
        }
      ]
    });

    // AUTO-RESPONSE TO USER
    await transporter.sendMail({
      from: `"Writewell Academy" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "We received your inquiry",
      html: `
        <p>Hello ${name},</p>
        <p>Thank you for contacting Writewell Academy!</p>
        <p>We will connect with you shortly.</p>
      `
    });

    res.json({ ok: true });

  } catch (err) {
    console.error("Inquiry Error:", err);
    res.json({ ok: false, error: "Server Error" });
  }
};
