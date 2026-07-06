const express = require("express");
const router = express.Router();

const studentController = require("../controllers/studentController");

// Register Student
router.post("/register", studentController.registerStudent);

module.exports = router;