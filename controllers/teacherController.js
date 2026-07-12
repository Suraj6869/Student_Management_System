const Teacher = require('../models/teacherModel');

const Student = require('../models/studentModel');

const teacherLogin = async (req,res) => {
    try {
        const { username, password } = req.body;

        const teacher = await Teacher.findOne({
            username,password
        }).select('-password');

        if (!teacher) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        res.status(200).json({ message: 'Login successful', teacher });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message 
        });
    }
};

const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find().sort({ uid: 1 }).select('-__v');

        res.status(200).json({
            success: true,
            totalStudents: students.length,students
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const searchStudent = async (req, res) => {
    try {
        const uid = Number(req.params.uid);

        const student = await Student.findOne({ uid }).select('-__v');

        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'Student not found'
            });
        }

        res.status(200).json({ success: true, student });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    teacherLogin,
    getAllStudents,
    searchStudent
};
