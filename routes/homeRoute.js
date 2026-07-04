const express = require ("express");

const router = express.Router();

const homeController = require("../controllers/homeController"); // Importing the homeController module

router.get("/", homeController.homePage);

module.exports = router;
