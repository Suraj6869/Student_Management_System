const express = require("express");

const router = express.Router();

const studentController = require("../controllers/studentController");

// Register Student
router.post("/register", studentController.registerStudent);

// Get All Students
router.get("/", studentController.getAllStudents);

// Get Student By UID
router.get("/:uid", studentController.getStudentByUID);

// Update Student
router.put("/:uid", studentController.updateStudent);

// Delete Student
router.delete("/:uid", studentController.deleteStudent);

module.exports = router;