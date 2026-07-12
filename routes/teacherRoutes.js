const express = require("express");

const router = express.Router();

const teacherController = require("../controllers/teacherController");

// ============================
// Teacher Login
// ============================
router.post("/login", teacherController.teacherLogin);

// ============================
// Get All Students
// ============================
router.get("/students", teacherController.getAllStudents);

// ============================
// Search Student By UID
// ============================
router.get("/students/:uid", teacherController.searchStudent);

// ============================
// Mark Attendance
// ============================
router.post("/attendance/:uid", teacherController.markAttendance);

module.exports = router;