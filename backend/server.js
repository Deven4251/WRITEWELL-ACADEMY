const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

// Load routes
const inquiryRoutes = require("./routes/inquiryRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");

dotenv.config();

const app = express();

// --------------------------------------------------
// GLOBAL CORS (BEST FOR FRONTEND PRODUCTION)
// --------------------------------------------------
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// app.options("*", cors()); // Preflight

// --------------------------------------------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// --------------------------------------------------
// DATABASE
// --------------------------------------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("📦 MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// --------------------------------------------------
// ROUTES
// --------------------------------------------------
app.use("/api/inquiry", inquiryRoutes);
app.use("/api/feedback", feedbackRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Writewell Academy Backend Running on vercel!");
});

// --------------------------------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend Running on Port ${PORT}`));
