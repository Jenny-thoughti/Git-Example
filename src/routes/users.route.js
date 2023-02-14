const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users.controller");

// TODO: @jenny complete this file
router.get("/", usersController.getAllUsers);

module.exports = router;
