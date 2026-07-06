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

module.exports = {
    registerStudent
};