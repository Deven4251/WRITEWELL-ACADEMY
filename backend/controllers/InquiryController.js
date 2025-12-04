const Inquiry = require("../models/Inquiry");
const sendEmail = require("../utils/sendEmail");
const generateReceiptPDF = require("../utils/generateReceipt");

exports.handleInquiry = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // 1. Save Inquiry
    const inquiry = await Inquiry.create({ name, email, phone, message });

    // 2. Generate PDF
    const pdfPath = generateReceiptPDF({
      name,
      email,
      phone,
      message,
      inquiryId: inquiry._id.toString(),
    });

    // 3. Send User Email
    await sendEmail({
      to: email,
      subject: "MAIL REGARDING YOUR ENQUIRY",
      html: `
        <div style="font-family: Arial, Helvetica, sans-serif; padding: 20px; background:#f7f7f7;">
          <div style="max-width: 600px; margin: auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">

            <!-- Banner -->
            <img
  src="https://drive.google.com/uc?export=view&id=1AvwTILxnMRTsHy5_jn5cXhN-gcQ61y0B"
  alt="Writewell Academy"
  style="width:100%; display:block; border:0; margin:0; padding:0;"
/>
            <div style="padding: 25px;">
              <h2 style="color: #333; font-weight: 600; margin-bottom: 10px;">
                Hello ${name},
              </h2>

              <p style="font-size: 15px; color: #555; line-height: 1.6;">
                Thank you for reaching out to <b>Writewell Academy</b>. We’ve successfully received your inquiry.
              </p>

              <p style="font-size: 15px; color: #555; line-height: 1.6;">
                Our Head Teacher will personally review your message and get back to you shortly with the best possible guidance.
              </p>

              <div style="margin: 25px 0; padding: 15px; background: #f0f8ff; border-left: 4px solid #007bff; border-radius: 6px;">
                <p style="font-size: 14px; color:#333; margin: 0;">
                  <b>Your Inquiry Summary:</b><br>
                  <span style="color:#555;">"${message}"</span>
                </p>
              </div>

              <p style="font-size: 15px; color: #555; line-height: 1.6;">
                We appreciate your time and interest in improving handwriting skills with us.
              </p>

              <p style="font-size: 15px; color: #333; line-height: 1.6; margin-top: 20px;">
                Warm regards,<br>
                <b>Writewell Academy</b>
              </p>
            </div>
          </div>
        </div>
      `,
    });

    // 4. Send Admin Email
    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: "New Inquiry Received",
      html: `
        <div style="font-family: Arial, sans-serif; background: #f5f5f5; padding: 20px;">
          <div style="
            max-width: 600px;
            margin: auto;
            background: #ffffff;
            padding: 20px 30px;
            border-radius: 8px;
            border: 1px solid #e0e0e0;
          ">

            <h2 style="color: #333333; margin-bottom: 10px;">New Inquiry Received</h2>
            <p style="color: #555555; margin-top: 0;">
              You have received a new inquiry. Details are provided below:
            </p>

            <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;" />

            <table cellpadding="6" style="width: 100%; border-collapse: collapse; font-size: 15px; color: #333;">
              <tr>
                <td style="font-weight: bold; width: 120px;">Name:</td>
                <td>${name}</td>
              </tr>
              <tr>
                <td style="font-weight: bold;">Email:</td>
                <td>${email}</td>
              </tr>
              <tr>
                <td style="font-weight: bold;">Phone:</td>
                <td>${phone}</td>
              </tr>
              <tr>
                <td style="font-weight: bold; vertical-align: top;">Message:</td>
                <td style="white-space: pre-line;">${message}</td>
              </tr>
            </table>

            <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;" />

            <p style="color: #777777; font-size: 14px;">
              A PDF receipt has been attached with this email.
            </p>

          </div>
        </div>
      `,
      attachments: [
        { filename: "receipt.pdf", path: pdfPath }
      ]

    });

    return res.status(200).json({
      ok: true,
      message: "Inquiry processed successfully (email + PDF)",
    });
  } catch (err) {
    console.log("❌ SERVER CRASH:", err);

    return res.status(500).json({
      ok: false,
      error: "Server error",
    });
  }
};
