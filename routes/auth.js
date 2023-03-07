const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');

const models = require('../models');
const jwtSecret = require('../config/jwtConfig');
const {accessToken} = require('../validations/users-validation');

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
          return res.status(400).json({
            success: false,
            errors: errors.array(),
          });
        }
        console.log(req.body);
        passport.authenticate('login', (err, users, info) => {
          if (err) {
            return res.status(401).send({'error': err});
          }
          if (info !== undefined) {
            if (info.message === 'bad user_name') {
              return res.status(401).send({'error': info.message});
            }
            return res.status(401).send({'error': info.message});
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
                expiresIn: 60 * 30, // 15 Min
              });
              Users.update({access_token: token}, {where: {id: users.id}});
              return res.status(200).send({auth: true, id: users.id, token});
            });
          });
        })(req, res, next);
      } catch (err) {
        res.status(500).send(err);
      }
    },
);


// home
router.get('/home', accessToken, (req, res)=> {
  try {
    jwt.verify(req.token, jwtSecret.secret, (err, users)=>{
      if (err) {
        console.log('error while verifying access token:', err);
        return res.status(403).send(err);
      }
      console.log('testing: ', users);
      const authData = {
        id: users.id,
        role: users.role,
      };
      res.json({
        message: 'Welcome to Profile',
        userData: authData,
      });
    });
  } catch (err) {
    res.status(500).send('err');
  }
});


router.post('/logout', (req, res, next) => {
  try {
    passport.authenticate('jwt', {session: false}, async (err, users, info) => {
      if (err) {
        return res.status(401).send(err);
      }
      if (info !== undefined) {
        return res.status(401).send({'error': info.message});
      }
      const authorizationHeader = req.headers.authorization;
      const jwtToken = authorizationHeader.split(' ')[1];
      const data = await Users.findOne({where: {access_token: jwtToken}});
      if (users.id) {
        if (data !== null) {
          await Users.update({access_token: null}, {where: {id: users.id}});
          return res.status(200).send('logout');
        }
        return res.status(404).send({'users': 'No token'});
      }
      return res.status(401).send('User is not authent`icated');
    })(req, res, next);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
