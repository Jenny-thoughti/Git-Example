const express = require('express');

const userRoutes = require('./users-router');
const postRoutes = require('./posts-router');

const router = express.Router();

//  Users
router.use('/users', userRoutes);

// Posts
router.use('/posts', postRoutes);

module.exports = router;
