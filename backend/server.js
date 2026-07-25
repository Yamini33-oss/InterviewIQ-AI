require("./tracing"); // Must be first
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const evaluateRoute = require("./evaluate");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", evaluateRoute);

// Health Check Route
app.get("/", (req, res) => {
  res.send("🚀 InterviewIQ Backend is Running!");
});

// API Route
app.get("/api/message", (req, res) => {
  res.json({
    success: true,
    message: "Hello from Express Backend 🚀"
  });
});

// 👇 Add this new route
app.get("/api/error", (req, res) => {
  throw new Error("Interview failed");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});