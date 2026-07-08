const express = require("express");

const router = express.Router();

const studentController = require("../controllers/studentController");

// Register
router.post("/register", studentController.registerStudent);

// Get All
router.get("/", studentController.getAllStudents);

// Get One
router.get("/id/:uid", studentController.getStudentByUID);

// Update
router.put("/id/:uid", studentController.updateStudent);

// Delete
router.delete("/id/:uid", studentController.deleteStudent);

module.exports = router;