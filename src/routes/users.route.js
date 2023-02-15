const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users.controller");

// TODO: @jenny complete this file
router.get("/", usersController.getUsersList);

//done
// get users by ID
router.get('/:id',usersController.getUsersByID);

// create new users
router.post('/', usersController.createNewUsers);

// update users
router.put('/:id', usersController.updateUsers);

// delete users
router.delete('/:id',usersController.deleteUsers);

module.exports = router;
