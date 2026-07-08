const express = require("express");
const router = express.Router();

const studentController = require("../controllers/studentController");

// Register Student
router.get("/",studentController.getAllStudents);

router.get("/id/:uid", studentController.getStudentByUID);

router.post("/register", studentController.registerStudent);

module.exports = router;