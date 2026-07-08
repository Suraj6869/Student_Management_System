const Student = require("../models/StudentModel");

const registerStudent = async (req, res) => {
    try {

        // Debugging
        console.log("Request Body:", req.body);

        // Check if body exists
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Request body is empty. Please send JSON data."
            });
        }

        const {
            name,
            age,
            gender,
            batch,
            email,
            contact
        } = req.body;

        // Find last student
        const lastStudent = await Student.findOne().sort({ uid: -1 });

        let uid = 1;

        if (lastStudent) {
            uid = Number(lastStudent.uid) + 1;
        }

        const student = new Student({
            uid: uid.toString(),
            name,
            age,
            gender,
            batch,
            email,
            contact
        });

        await student.save();

        res.status(201).json({
            success: true,
            message: "Student registered successfully",
            student
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find().sort({ uid: 1 });

        if (!students || students.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No Students"
            });
        }

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

const getStudentByUID = async (req, res) => {
    try {
        const uid = Number(req.params.uid);

        const student = await Student.findOne({ uid });

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        return res.status(200).json({
            success: true,
            student
        });
    } 
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    registerStudent,
    getAllStudents,
    getStudentByUID
};