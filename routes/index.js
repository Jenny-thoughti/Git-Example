const express = require('express');

const userRoutes = require('./users-router');
const postRoutes = require('./posts-router');

const router = express.Router();

router.use('/users', userRoutes); // Users

router.use('/posts', postRoutes); // Posts

module.exports = router;
