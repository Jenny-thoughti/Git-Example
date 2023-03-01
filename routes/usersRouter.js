const {Router} = require('express');
const usersControllers = require('../controllers/usersController');

const router = Router();

router.get('/scopes', usersControllers.scopes);

router.get('/', usersControllers.getAllUsers);

router.get('/:id', usersControllers.getById);

// router.get('/status/scopes', usersControllers.scopes);

router.post('/', usersControllers.addUser);

router.put('/:id', usersControllers.updateUsers);

router.delete('/:id', usersControllers.deleteUsers);

module.exports = router;
