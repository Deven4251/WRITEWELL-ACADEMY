const mongoose = require("mongoose");

const InquirySchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    message: { type: String },
    createdAt: { type: Date, default: Date.now },
    source: { type: String } // optional: frontend source or campaign
});

module.exports = mongoose.models.Inquiry || mongoose.model("Inquiry", InquirySchema);
