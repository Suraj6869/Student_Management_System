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
            minlength: 2,
            maxlength: 50
        },

        username: {
            type: String,
            required: [true, "Username is required"],
            trim: true,
            unique: true,
            lowercase: true
        },

        password: {
            type: String,
            required: [true, "Password is required"]
        },

        subject: {
            type: String,
            required: [true, "Subject is required"],
            trim: true
        }
    },
    {
        timestamps: true
    }
);

module.exports =
    mongoose.models.Teacher ||
    mongoose.model("Teacher", teacherSchema);