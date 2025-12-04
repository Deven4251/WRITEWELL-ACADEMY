const express = require("express");
const router = express.Router();
const { handleInquiry } = require("../controllers/InquiryController");

// Test endpoint
router.get("/test", (req, res) => {
  res.json({ ok: true, message: "Inquiry route is working" });
});

// POST /api/inquiry
router.post("/", handleInquiry);

module.exports = router;
