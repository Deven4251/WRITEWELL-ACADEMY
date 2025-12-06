const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");

// POST feedback
router.post("/", async (req, res) => {
    const fb = await Feedback.create(req.body);
    res.json({ success: true, feedback: fb });
});

// GET feedback list
router.get("/", async (req, res) => {
    const feedback = await Feedback.find().sort({ createdAt: -1 });
    res.json({ feedback });
});

// reactions
router.post("/react/:id", async (req, res) => {
    const { type, previous } = req.body;

    const update = {};
    if (previous) update[previous] = -1;
    update[type] = 1;

    const fb = await Feedback.findByIdAndUpdate(req.params.id, { $inc: update }, { new: true });

    res.json({ success: true, feedback: fb });
});

module.exports = router;
