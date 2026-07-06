const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
    {
        uid: {
            type: varchar,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        age: {
            type: Number,
            required: true,
        },
        gender: {
            type: String,
            enum: ["Male","Female","Other"],
            required: true
        },
        batch: {
            type: String,
            enum: ["Medical","Non-Medical"],
            required: true
        }
    },
    {
        timestamps: true    
    }
);


    