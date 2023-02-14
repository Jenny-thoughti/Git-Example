const express = require("express");

const userRoutes = require("./users.route");

const router = express.Router();

// TODO: @jenny complete this file
router.use("/users", userRoutes);

module.exports = router;
