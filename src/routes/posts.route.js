const express = require('express');
const router = express.Router();


const postsController = require("../controllers/posts.controller");



//posts
// get all userss
router.get('/', postsController.getPostsList);

// get users by ID
router.get('/:id',postsController.getPostsByID);

// create new users
router.post('/', postsController.createNewPosts);

// update users
router.put('/:id', postsController.updatePosts);

// delete users
router.delete('/:id', postsController.deletePosts);


module.exports = router;