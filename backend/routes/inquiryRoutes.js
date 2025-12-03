const express = require("express");
const router = express.Router();
const { handleInquiry } = require("../controllers/inquiryController");

router.post("/", handleInquiry);

module.exports = router;
