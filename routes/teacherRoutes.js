const express = require('express');

const router = express.Router();

const teacherController = require('../controllers/teacherController');

router.post('/login', teacherController.teacherLogin);

router.get('/students', teacherController.getAllStudents);

router.get('/students/:uid', teacherController.searchStudent);

module.exports = router;
