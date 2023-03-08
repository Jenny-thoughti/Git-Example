const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');

const models = require('../models');
const jwtSecret = require('../config/jwtConfig');
const {accessToken} = require('../validations/users-validation');
const helpers = require('../helpers/helpers');

const Users = models.User;
const router = express.Router();


router.post(
    '/login',
    [
      check('user_name', 'Username is invalid.').not().isEmpty(),
      check('password', 'Password is invalid').not().isEmpty(),
    ],
    (req, res, next) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return helpers.generateApiResponse(res, req, errors.array, 400);
        }
        console.log(req.body);
        passport.authenticate('login', (err, users, info) => {
          if (err) {
            return helpers.generateApiResponse(res, req, err, 401);
          }
          if (info !== undefined) {
            if (info.message === 'bad user_name') {
              return helpers.generateApiResponse(res, req, info.message, 401);
            }
            return helpers.generateApiResponse(res, req, info.message, 401);
          }
          req.logIn(users, () => {
            Users.findOne({
              where: {
                user_name: req.body.user_name,
              },
            }).then((users) => {
              const jwtData = {
                id: users.id,
                role: users.role,

              };
              const token = jwt.sign(jwtData, jwtSecret.secret, {
                expiresIn: 60 * 30, // 30 Min
              });
              Users.update({access_token: token}, {where: {id: users.id}});
              return helpers.generateApiResponse(res, req, 'Login successfully', 200, token);
            });
          });
        })(req, res, next);
      } catch (error) {
        helpers.generateApiResponse(res, req, error.message, 500);
      }
    },
);

// home
router.get('/home', accessToken, (req, res)=> {
  try {
    jwt.verify(req.token, jwtSecret.secret, (err, users)=>{
      if (err) {
        console.log('error while verifying access token:', err);
        return helpers.generateApiResponse(res, req, err.mesage, 403);
      }
      console.log('testing: ', users);
      const authData = {
        id: users.id,
        role: users.role,
      };
      helpers.generateApiResponse(res, req, 'Welcome to Profile', 200, authData);
    });
  } catch (error) {
    helpers.generateApiResponse(res, req, error.message, 500);
  }
});


router.post('/logout', (req, res, next) => {
  try {
    passport.authenticate('jwt', {session: false}, async (err, users, info) => {
      if (err) {
        return helpers.generateApiResponse(res, req, err.mesage, 401);
      }
      if (info !== undefined) {
        return helpers.generateApiResponse(res, req, info.mesage, 401);
      }
      const authorizationHeader = req.headers.authorization;
      const jwtToken = authorizationHeader.split(' ')[1];
      const data = await Users.findOne({where: {access_token: jwtToken}});
      if (users.id) {
        if (data !== null) {
          await Users.update({access_token: null}, {where: {id: users.id}});
          return helpers.generateApiResponse(res, req, 'Logout successfully', 200);
        }
        return helpers.generateApiResponse(res, req, 'No Token Found', 404);
      }
      return helpers.generateApiResponse(res, req, 'User is not authenticated', 401);
    })(req, res, next);
  } catch (err) {
    helpers.generateApiResponse(res, req, err.mesage, 500);
  }
});

module.exports = router;
