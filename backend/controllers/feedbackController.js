const Feedback = require("../models/feedbackModel");

// CREATE Feedback
exports.createFeedback = async (req, res) => {
    try {
        const { name, message } = req.body;

        if (!name || !message) {
            return res.status(400).json({ ok: false, error: "Name and message are required" });
        }

        const fb = await Feedback.create({ name, message });

        res.status(201).json({
            ok: true,
            message: "Feedback submitted successfully",
            feedback: fb,
        });

    } catch (err) {
        console.error("❌ Feedback Error:", err);
        res.status(500).json({ ok: false, error: "Server error" });
    }
};

// READ All Feedback
exports.getFeedback = async (req, res) => {
    try {
        const allFeedback = await Feedback.find().sort({ createdAt: -1 });

        res.status(200).json({
            ok: true,
            feedback: allFeedback,
        });

    } catch (err) {
        console.error("❌ Feedback Fetch Error:", err);
        res.status(500).json({ ok: false, error: "Server error" });
    }
};
