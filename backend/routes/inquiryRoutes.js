const express = require("express");
const router = express.Router();
const { handleInquiry } = require("../controllers/InquiryController");

router.post("/", handleInquiry);

module.exports = router;
