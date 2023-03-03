const {Router} = require('express');
const UsersControllers = require('../controllers/user-login');

const router = Router();


router.get('/users/login', UsersControllers.login);

router.post('/Users/auth', UsersControllers.userAuth);

router.get('/home', UsersControllers.home);

module.exports = router;
