const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");

// Public: post feedback
router.post("/", async (req, res) => {
    try {
        const { name, message } = req.body;
        if (!name || !message) return res.status(400).json({ message: "Missing fields" });
        const fb = await Feedback.create({ name, message });
        res.status(201).json({ success: true, feedback: fb });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// Public: get approved/published feedback (for Insights page)
router.get("/public", async (req, res) => {
    try {
        const feedback = await Feedback.find().sort({ createdAt: -1 });
        res.json({ feedback });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

router.get("/", async (req, res) => {
    const feedback = await Feedback.find().sort({ createdAt: -1 });
    res.json({ feedback });
});


router.post("/react/:id", async (req, res) => {
    try {
        const { type, previous } = req.body;

        const valid = ["like", "love", "wow"];
        if (!valid.includes(type)) {
            return res.status(400).json({ error: "Invalid type" });
        }

        const update = {};

        // Remove previous reaction
        if (previous && valid.includes(previous)) {
            update[previous] = -1;
        }

        // Add new reaction
        update[type] = 1;

        const updated = await Feedback.findByIdAndUpdate(
            req.params.id,
            { $inc: update },
            { new: true }
        );

        return res.json({ success: true, feedback: updated });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
});


module.exports = router;
