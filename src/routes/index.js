const express = require("express");

const userRoutes = require("./users.route");

const router = express.Router();

// TODO: @jenny complete this file

//Users 
router.use("/users", userRoutes);

//Posts


module.exports = router;
