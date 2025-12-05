const generateReceiptPDF = require("../utils/generateReceipt");
const transporter = require("../utils/sendEmail");

exports.sendInquiry = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    const inquiryId = Date.now().toString();

    // Generate PDF (Buffer)
    const pdfBuffer = await generateReceiptPDF({
      name,
      email,
      phone,
      message,
      inquiryId
    });

    // ADMIN EMAIL
    await transporter.sendMail({
      from: `"Writewell Academy" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: "New Inquiry Received (PDF Attached)",
      html: `<p>New inquiry received from <strong>${name}</strong>. PDF receipt is attached.</p>`,
      attachments: [
        {
          filename: `Inquiry-${inquiryId}.pdf`,
          content: pdfBuffer,
          contentType: "application/pdf"
        }
      ]
    });

    // USER EMAIL
    await transporter.sendMail({
      from: `"Writewell Academy" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Inquiry Copy — Writewell Academy",
      html: `
                <p>Hello ${name},</p>
                <p>Thank you for contacting Writewell Academy.</p>
                <p>This is a copy of your inquiry:</p>
                <p><strong>${message}</strong></p>
            `
    });

    res.json({ ok: true });

  } catch (err) {
    console.error(err);
    res.json({ ok: false, error: "Email sending failed" });
  }
};
