const express = require('express');

const userRoutes = require('./users-router');
const postRoutes = require('./posts-router');
const authRouter = require('./auth-router');

const router = express.Router();


router.use('/users', authRouter); // login Rest Api

//  Users
router.use('/users', userRoutes);

// Posts
router.use('/posts', postRoutes);

module.exports = router;
