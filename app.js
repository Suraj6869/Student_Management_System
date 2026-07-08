require("dotenv").config();

const express = require("express");

const connectDB = require("./config/db");

const homeRoute = require("./routes/homeRoute");
const studentRoutes = require("./routes/studentRoutes");

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", homeRoute);
app.use("/students", studentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});