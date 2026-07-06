require("dotenv").config();

const express = require("express");

const connectDB = require("./config/db");

const homeRoute = require("./routes/homeRoute");
const studentRoutes = require("./routes/studentRoutes");

const PORT = process.env.PORT || 3000;

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", homeRoute);
app.use("/students", studentRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});