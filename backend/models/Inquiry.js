const mongoose = require("mongoose");

const InquirySchema = new mongoose.Schema({
    name: { type: String, required: [true, "Name is required"] },
    email: {
        type: String,
        required: [true, "Email is required"],
        lowercase: true,
        trim: true
    },
    phone: {
        type: String,
        required: [true, "Phone is required"]
    },
    message: {
        type: String,
        required: [true, "Message is required"]
    },
    createdAt: { type: Date, default: Date.now },
    source: { type: String } // optional: frontend source or campaign
}, {
    timestamps: true // Adds createdAt and updatedAt automatically
});

// Prevent model re-compilation during hot reloads
const Inquiry = mongoose.models.Inquiry || mongoose.model("Inquiry", InquirySchema);

module.exports = Inquiry;
