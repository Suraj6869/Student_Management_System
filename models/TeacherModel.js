const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
    {
        teacherId: {
            type: Number,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: [true, "Teacher name is required"],
            trim: true,
        },
        username: {
            type: String,
            required: [true, "Username is required"],
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        subject : {
            type: String,
            required: [true, "Subject is required"],
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Teacher", teacherSchema);