const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
    {
        date: {
            type: String,
            required: true,
            trim: true
        },
        status: {
            type: String,
            required: true,
            enum: ["Present", "Absent", "Half Day", "Late"]
        }
    },
    {
        _id: false
    }
);

const studentSchema = new mongoose.Schema(
    {
        uid: {
            type: Number,
            required: true,
            unique: true
        },

        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 50
        },

        age: {
            type: Number,
            required: true,
            min: 3,
            max: 100
        },

        gender: {
            type: String,
            required: true,
            enum: ["Male", "Female", "Other"]
        },

        batch: {
            type: String,
            required: true,
            enum: ["Medical", "Non-Medical", "Commerce"]
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        contact: {
            type: String,
            required: true,
            match: /^[6-9]\d{9}$/
        },

        attendance: [attendanceSchema]
    },
    {
        timestamps: true
    }
);

module.exports =
    mongoose.models.Student ||
    mongoose.model("Student", studentSchema);