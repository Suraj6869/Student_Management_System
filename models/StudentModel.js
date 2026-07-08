const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    rollNo: {
      type: Number,
      required: true,
      unique: true
    },

    name: {
      type: String,
      required: [true, "Student name is required"],
      trim: true,
      minlength: [2, "Name must contain at least 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"]
    },

    age: {
      type: Number,
      required: [true, "Age is required"],
      min: [3, "Minimum age is 3 years"],
      max: [30, "Maximum age is 30 years"]
    },

    gender: {
      type: String,
      required: true,
      enum: {
        values: ["Male", "Female", "Other"],
        message: "Gender must be Male, Female or Other"
      }
    },

    batch: {
      type: String,
      required: true,
      enum: {
        values: ["Medical", "Non Medical", "Commerce"],
        message: "Invalid batch selected"
      }
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\S+@\S+\.\S+$/,
        "Please enter a valid email address"
      ]
    },

    phone: {
      type: String,
      required: true,
      match: [
        /^[6-9]\d{9}$/,
        "Please enter a valid 10-digit Indian mobile number"
      ]
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Student", studentSchema);