const express = require("express");
const router = express.Router();
const { sendInquiry } = require("../controllers/InquiryController");

router.post("/", sendInquiry);

module.exports = router;
