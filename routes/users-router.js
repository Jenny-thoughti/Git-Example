const {Router} = require('express');
const usersControllers = require('../controllers/users-controller');

const router = Router();

router.get('/scopes', usersControllers.scopes);

router.get('/', usersControllers.getAllUsers);

router.get('/:id', usersControllers.getById);

router.post('/', usersControllers.addUser);

router.put('/:id', usersControllers.updateUsers);

router.delete('/:id', usersControllers.deleteUsers);

module.exports = router;
