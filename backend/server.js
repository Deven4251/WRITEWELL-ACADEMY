const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

dotenv.config();

const inquiryRoutes = require("./routes/inquiryRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");

const app = express();

// ----------------------------
// CORS CONFIGURATION (FIXED)
// ----------------------------
const allowedOrigins = [
  "https://writewell-academy.vercel.app/",
  "http://localhost:5173",
  "http://localhost:3000"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow backend tools & server-to-server calls
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("❌ BLOCKED ORIGIN:", origin);
        callback(new Error("CORS blocked"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ----------------------------
// MongoDB Connection
// ----------------------------
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("📦 MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// ----------------------------
// ROUTES
// ----------------------------
app.use("/api/Inquiry", inquiryRoutes);
app.use("/api/feedback", feedbackRoutes);

// Root endpoint
app.get("/", (req, res) =>
  res.send("Handwriting Excellence Backend Running...")
);

// ----------------------------
// START SERVER
// ----------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
