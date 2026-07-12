const Student = require("../models/StudentModel");

// ============================
// Register Student
// ============================
const registerStudent = async (req, res) => {
    try {

        const {
            name,
            age,
            gender,
            batch,
            email,
            contact
        } = req.body;

        if (!name || !age || !gender || !batch || !email || !contact) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields."
            });
        }

        // Check duplicate email
        const existingEmail = await Student.findOne({ email });

        if (existingEmail) {
            return res.status(400).json({
                success: false,
                message: "Email already exists."
            });
        }

        // Check duplicate contact
        const existingContact = await Student.findOne({ contact });

        if (existingContact) {
            return res.status(400).json({
                success: false,
                message: "Contact number already exists."
            });
        }

        // Generate next UID
        const lastStudent = await Student.findOne().sort({ uid: -1 });

        let uid = 1;

        if (lastStudent) {
            uid = lastStudent.uid + 1;
        }

        const student = await Student.create({
            uid,
            name,
            age,
            gender,
            batch,
            email,
            contact,
            attendance: []
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

// ============================
// Get All Students
// ============================
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

// ============================
// Get Student By UID
// ============================
const getStudentByUID = async (req, res) => {

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

// ============================
// Update Student
// ============================
const updateStudent = async (req, res) => {

    try {

        const uid = Number(req.params.uid);

        const updatedStudent = await Student.findOneAndUpdate(
            { uid },
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

// ============================
// Delete Student
// ============================
const deleteStudent = async (req, res) => {

    try {

        const uid = Number(req.params.uid);

        const deletedStudent = await Student.findOneAndDelete({ uid });

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