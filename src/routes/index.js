const express = require("express");

const userRoutes = require("./users.route");
const postRoutes = require("./posts.route");

const router = express.Router();

// TODO: @jenny complete this file

//Users 
router.use("/users", userRoutes);

//Posts
router.use("/posts", postRoutes);

module.exports = router;