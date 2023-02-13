const express = require('express');
const router = express.Router();

const usersController = require('./users-export');


//users
// get all userss
router.get('/users', usersController.getUsersList);

// get users by ID
router.get('/users/:id',usersController.getUsersByID);

// create new users
router.post('/users', usersController.createNewUsers);

// update users
router.put('/users/:id"', usersController.updateUsers);

// delete users
router.delete('/users/:id',usersController.deleteUsers);



//posts
// get all userss
//router.get('/posts', postsController.getPostsList);

// get users by ID
//router.get('/posts/:id',postsController.getPostsByID);

// create new users
//router.post('/posts', postsController.createNewPosts);

// update users
//router.put('/posts/:id', postsController.updatePosts);

// delete users
//router.delete('/posts/:id', postsController.deletePosts);


module.exports = router;
