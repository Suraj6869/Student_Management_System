const Teacher = require('../models/teacherModel');

const teacherLogin = async (req,res) => {
    try {
        const { username, password } = req.body;

        const teacher = await Teacher.findOne({
            username,password
        });

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

module.exports = {
    teacherLogin
};