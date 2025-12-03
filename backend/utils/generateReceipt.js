const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

module.exports = function generateReceiptPDF({ name, email, phone, message, inquiryId }) {
    const receiptsDir = path.join(process.cwd(), "INQUIRY RECEIPT");

    if (!fs.existsSync(receiptsDir)) {
        fs.mkdirSync(receiptsDir);
    }

    const filePath = path.join(receiptsDir, `receipt-${inquiryId}.pdf`);
    const doc = new PDFDocument();
    const stream = fs.createWriteStream(filePath);

    doc.pipe(stream);

    doc.fontSize(22).fillColor("indigo").text("writewell academy", { align: "center" });
    doc.moveDown();

    doc.fontSize(14).fillColor("#10B981").text("Inquiry Receipt", { align: "center" });

    doc.moveDown().fontSize(12).fillColor("black");
    doc.text(`Receipt ID: ${inquiryId}`);
    doc.text(`Name: ${name}`);
    doc.text(`Email: ${email}`);
    doc.text(`Phone: ${phone || "N/A"}`);
    doc.text(`Message: ${message || "N/A"}`);
    doc.text(`Date: ${new Date().toLocaleString()}`);

    doc.end();

    return filePath;
};
