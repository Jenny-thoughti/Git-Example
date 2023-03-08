const {Router} = require('express');

const usersControllers = require('../controllers/users-controller');
const {userDataValidate} = require('../validations/users-validation');

const router = Router();


//  Users
router.get('/scopes/:status', usersControllers.check);

router.get('/', usersControllers.getAllUsers);

router.get('/:id', usersControllers.getById);

router.post('/', userDataValidate, usersControllers.addUser);

router.put('/:id', userDataValidate, usersControllers.updateUsers);

router.delete('/:id', usersControllers.deleteUsers);

module.exports = router;
