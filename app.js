require('dotenv').config(); // Load environment variables from .env file

const express = require('express');

const connectDB = require('./config/db'); // Importing the connectDB function from config/db.js    

const homeRoute = require('./routes/homeRoute'); // Importing the homeRoute module 

const app = express();

connectDB();

const PORT = process.env.PORT || 3000; // Setting the port from environment variable or default to 3000

const Student = require('./models/Students'); // Importing the Student model from models/Students.js

console.log(Student.modelName); // Logging the Student model to the console for debugging purposes

app.use(express.json()); // acts as a middleware to parse incoming JSON requests

app.use('/', homeRoute); // Mounting the homeRoute module to the root path

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});