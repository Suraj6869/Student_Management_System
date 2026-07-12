const Teacher = require("../models/TeacherModel");
const Student = require("../models/StudentModel");

// ====================================
// Teacher Login
// ====================================
const teacherLogin = async (req, res) => {
    try {

        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Username and Password are required."
            });
        }

        const teacher = await Teacher.findOne({
            username: username.toLowerCase(),
            password
        }).select("-password -__v");

        if (!teacher) {
            return res.status(401).json({
                success: false,
                message: "Invalid username or password."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Login successful.",
            teacher
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ====================================
// Get All Students
// ====================================
const getAllStudents = async (req, res) => {

    try {

        const students = await Student.find()
            .sort({ uid: 1 })
            .select("-__v");

        return res.status(200).json({
            success: true,
            totalStudents: students.length,
            students
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ====================================
// Search Student by UID
// ====================================
const searchStudent = async (req, res) => {

    try {

        const uid = Number(req.params.uid);

        const student = await Student.findOne({ uid }).select("-__v");

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found."
            });
        }

        return res.status(200).json({
            success: true,
            student
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ====================================
// Mark Attendance
// ====================================
const markAttendance = async (req, res) => {

    try {

        const uid = Number(req.params.uid);

        const { date, status } = req.body;

        if (!date || !status) {

            return res.status(400).json({
                success: false,
                message: "Date and Status are required."
            });

        }

        const student = await Student.findOne({ uid });

        if (!student) {

            return res.status(404).json({
                success: false,
                message: "Student not found."
            });

        }

        const attendanceExists = student.attendance.find(
            record => record.date === date
        );

        if (attendanceExists) {

            return res.status(400).json({
                success: false,
                message: "Attendance already marked for this date."
            });

        }

        student.attendance.push({
            date,
            status
        });

        await student.save();

        return res.status(200).json({
            success: true,
            message: "Attendance marked successfully.",
            attendance: student.attendance
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    teacherLogin,
    getAllStudents,
    searchStudent,
    markAttendance
};