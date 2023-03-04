const express = require('express');

const userRoutes = require('./users-router');
const postRoutes = require('./posts-router');
const authRouter = require('./auth');
const loginRoutes = require('./login-router');

const router = express.Router();
// login
router.use('/', authRouter);

router.use('/', loginRoutes);

//  Users
router.use('/users', userRoutes);

// Posts
router.use('/posts', postRoutes);

module.exports = router;
