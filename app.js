const express = require('express');
const app = express();

const PORT = 5000;

const homeRoute = require('./routes/homeRoute');

app.use(express.json()); // acts as a middleware to parse incoming JSON requests

app.use('/', homeRoute);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});