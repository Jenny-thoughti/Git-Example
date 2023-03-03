const express = require('express');

const userRoutes = require('./users-router');
const postRoutes = require('./posts-router');
const loginRoutes = require('./login-router');

const router = express.Router();
// login
router.use('/', loginRoutes);

//  Users
router.use('/users', userRoutes);

// Posts
router.use('/posts', postRoutes);

module.exports = router;
