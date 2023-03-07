const express = require('express');

const userRoutes = require('./users-router');
const postRoutes = require('./posts-router');
const authRouter = require('./auth');


const router = express.Router();
// login Rest Api
router.use('/users', authRouter);

//  Users
router.use('/users', userRoutes);

// Posts
router.use('/posts', postRoutes);

module.exports = router;
