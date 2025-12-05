const PDFDocument = require("pdfkit");
const path = require("path");

module.exports = function generateReceiptPDF({ name, email, phone, message, inquiryId }) {
    return new Promise((resolve, reject) => {
        try {
            const doc = new PDFDocument({
                size: "A4",
                margin: 40
            });

            let buffers = [];
            doc.on("data", chunk => buffers.push(chunk));
            doc.on("end", () => resolve(Buffer.concat(buffers)));

            const logoPath = path.join(process.cwd(), "assets", "logo.png");

            // -----------------------------
            // BRAND HEADER

            
                doc.rect(0, 0, doc.page.width, 90)
                    .fill("#4F46E5"); // Writewell Indigo shade

            // Logo
            doc.image(logoPath, 40, 15, { width: 60 });

            // Title
            doc.fillColor("white")
                .fontSize(26)
                .text("Writewell Academy", 120, 28);

            doc.fontSize(12)
                .fillColor("#E0E7FF")
                .text("Handwriting Excellence & Training Center", 120, 58);

            doc.moveDown(3);

            // -----------------------------
            // DOCUMENT TITLE

                doc.fillColor("#1F2937")
                    .fontSize(22)
                    .text("Inquiry Receipt", { align: "center" });

            doc.moveDown(1);

            doc.fillColor("#6B7280")
                .fontSize(12)
                .text(`Receipt ID: ${inquiryId}`, { align: "center" })
                .text(`Generated on: ${new Date().toLocaleString()}`, { align: "center" });

            doc.moveDown(2);

            // -----------------------------
            // INFORMATION BOX

            const boxX = 40;
            const boxY = doc.y;
            const boxWidth = doc.page.width - 80;
            const boxHeight = 220;

            doc.rect(boxX, boxY, boxWidth, boxHeight)
                .fill("#F8FAFC");

            doc.fillColor("#1E3A8A")
                .fontSize(16)
                .text("Inquiry Details", boxX + 15, boxY + 15);

            doc.fillColor("#111827")
                .fontSize(12);

            doc.text(`Name: ${name}`, boxX + 15, boxY + 50);
            doc.text(`Email: ${email}`, boxX + 15, boxY + 80);
            doc.text(`Phone: ${phone}`, boxX + 15, boxY + 110);

            doc.text("Message:", boxX + 15, boxY + 150);

            doc.fontSize(12)
                .fillColor("#374151")
                .text(message, boxX + 15, boxY + 170, {
                    width: boxWidth - 30
                });

            // -----------------------------
            // FOOTER
            //------------------------------
                doc.fillColor("#6B7280")
                    .fontSize(10)
                    .text(
                        "Thank you for reaching out. A team member will contact you within 24 hours.\n\nWritewell Academy • Klassic Landmark Apartment, Bangalore",
                        40,
                        doc.page.height - 80,
                        { align: "center" }
                    );

            doc.end();

        } catch (error) {
            reject(error);
        }
    });
};
