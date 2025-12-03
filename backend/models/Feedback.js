const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    name: String,
    message: String,
    createdAt: { type: Date, default: Date.now },

    like: { type: Number, default: 0 },
    love: { type: Number, default: 0 },
    wow: { type: Number, default: 0 },
});

module.exports = mongoose.model("Feedback", feedbackSchema);
