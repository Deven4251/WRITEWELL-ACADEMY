const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

dotenv.config();

const inquiryRoutes = require("./routes/inquiryRoutes");
const feedbackRoutes=require("./routes/feedbackRoutes");

const app = express();

// Basic CORS — allow frontend origin and allow credentials
app.use(cors({
    origin: "http://localhost:5173", // change to your frontend origin (Vite default)
    credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// session middleware
app.use(session({
    secret: process.env.ADMIN_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    }
  }));


// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("📦 MongoDB Connected"))
    .catch((err) => console.error("❌ MongoDB Error:", err));

// Public routes
app.use("/api/inquiry", inquiryRoutes);
app.use("/api/feedback", feedbackRoutes);

// Root endpoint
app.get("/", (req, res) => res.send("Handwriting Excellence Backend Running..."));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
