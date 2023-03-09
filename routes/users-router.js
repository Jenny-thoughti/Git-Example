const {Router} = require('express');

const usersControllers = require('../controllers/users-controller');
const {userDataValidate, loginValidation} = require('../validations/users-validation');

const router = Router();

router.post('/login', loginValidation, usersControllers.userLogin);

router.get('/home', usersControllers.home);

router.post('/logout', usersControllers.logout);

router.get('/scopes/:status', usersControllers.check);

router.get('/', usersControllers.getAllUsers);

router.get('/:id', usersControllers.getById);

router.post('/', userDataValidate, usersControllers.addUser);

router.put('/:id', userDataValidate, usersControllers.updateUsers);

router.delete('/:id', usersControllers.deleteUsers);

module.exports = router;
