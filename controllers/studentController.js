const Student = require("../models/StudentModel");

// Register Student
const registerStudent = async (req, res) => {
    try {
        const { name, age, gender, batch, email, contact } = req.body;

        if (!name || !age || !gender || !batch || !email || !contact) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields."
            });
        }

        // Check duplicate email
        const existingStudent = await Student.findOne({ email });

        if (existingStudent) {
            return res.status(400).json({
                success: false,
                message: "Email already exists."
            });
        }

        // Generate UID
        const lastStudent = await Student.findOne().sort({ createdAt: -1 });

        let uid = "STU001";

        if (lastStudent) {
            const lastNumber = parseInt(lastStudent.uid.replace("STU", ""));
            uid = `STU${String(lastNumber + 1).padStart(3, "0")}`;
        }

        const student = await Student.create({
            uid,
            name,
            age,
            gender,
            batch,
            email,
            contact
        });

        return res.status(201).json({
            success: true,
            message: "Student registered successfully.",
            student
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get All Students
const getAllStudents = async (req, res) => {
    try {

        const students = await Student.find().sort({ createdAt: -1 });

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

// Get Student By UID
const getStudentByUID = async (req, res) => {
    try {

        const student = await Student.findOne({
            uid: req.params.uid
        });

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

// Update Student
const updateStudent = async (req, res) => {
    try {

        const updatedStudent = await Student.findOneAndUpdate(
            { uid: req.params.uid },
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedStudent) {
            return res.status(404).json({
                success: false,
                message: "Student not found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Student updated successfully.",
            student: updatedStudent
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Delete Student
const deleteStudent = async (req, res) => {
    try {

        const deletedStudent = await Student.findOneAndDelete({
            uid: req.params.uid
        });

        if (!deletedStudent) {
            return res.status(404).json({
                success: false,
                message: "Student not found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Student deleted successfully.",
            student: deletedStudent
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    registerStudent,
    getAllStudents,
    getStudentByUID,
    updateStudent,
    deleteStudent
};