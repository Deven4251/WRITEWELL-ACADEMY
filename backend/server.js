
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const inquiryRoutes = require("./routes/inquiryRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");

const app = express();

// ----------------------------
// CORS CONFIGURATION (WORKING)
// ----------------------------

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// Body parsing middleware (must be before routes)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Request logging middleware (for debugging)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
  if (req.method === "POST" || req.method === "PUT") {
    console.log("Request body:", JSON.stringify(req.body, null, 2));
    console.log("Content-Type:", req.get("Content-Type"));
  }
  next();
});

// ----------------------------
// MongoDB Connection
// ----------------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("📦 MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    console.error("MONGO_URI:", process.env.MONGO_URI ? "Set" : "NOT SET");
    process.exit(1);
  });

// Handle connection events
mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB Connection Error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.warn("⚠️  MongoDB Disconnected");
});

// ----------------------------
// ROUTES
// ----------------------------
app.use("/api/inquiry", inquiryRoutes);
app.use("/api/feedback", feedbackRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.send("Handwriting Excellence Backend Running...");
});

// ----------------------------
// START SERVER
// ----------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
