const PDFDocument = require("pdfkit");

module.exports = function generateReceiptPDF(data) {
    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument();
        let buffers = [];

        doc.on("data", buffers.push.bind(buffers));
        doc.on("end", () => {
          const pdfData = Buffer.concat(buffers);
          resolve(pdfData);
        });

        doc.fontSize(22).text("Writewell Academy", { align: "center" });
        doc.moveDown();

        doc.fontSize(14).text("Inquiry Receipt", { align: "center" });
        doc.moveDown();

        doc.fontSize(12).text(`Name: ${data.name}`);
        doc.text(`Email: ${data.email}`);
        doc.text(`Phone: ${data.phone}`);
        doc.text(`Message: ${data.message}`);
        doc.text(`ID: ${data.inquiryId}`);

        doc.end();
      } catch (err) {
        reject(err);
      }
    });
  };
