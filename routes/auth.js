const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');

const models = require('../models');
const jwtSecret = require('../config/jwtConfig');
const {accessToken} = require('../validations/users-validation');

const Users = models.User;
// const JwtToken = models.JwtToken;
const router = express.Router();


router.post(
    '/login',
    [
      check('user_name', 'Username is invalid.').not().isEmpty(),
      check('password', 'Password is invalid').not().isEmpty(),
    ],
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array(),
        });
      }
      console.log(req.body);
      // eslint-disable-next-line consistent-return
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
            //  Users.create({accessToken: token})
            // const token = jwt.sign(jwtData, jwtSecret.secret, {
            //   expiresIn: 60 * 15, // 15 Min
            // });
            // const access = {
            //   access_token: users.access_token,
            // };
            Users.update({access_token: token}, {where: {id: users.id}});
            return res.status(200).send({auth: true, id: users.id, token});
          });
        });
      })(req, res, next);
    },
);


// home
router.get('/home', accessToken, (req, res)=> {
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
    // const authorizationHeader = req.headers.authorization;
    // const jwtToken = authorizationHeader.split(' ')[1];
    // set access_token as null
    // const data = {
    //   access_token: jwtToken,
    // };
    // console.log(data);
    res.json({
      message: 'Welcome to Profile',
      userData: authData,
    });
  });
});


// router.post('/logout', async (req, res, next) => {
//   // eslint-disable-next-line consistent-return
//   passport.authenticate('jwt', {session: false}, async (err, users, info) => {
//     if (err) {
//       return res.status(401).send({'error1': err});
//     }
//     if (info !== undefined) {
//       return res.status(401).send({'error2': info.message});
//     }
//     // const userId =parseInt(req.body.id, 100);
//     // console.log(user.id, userId);
//     if (users.id) {
//       const authorizationHeader = req.headers.authorization;
//       const jwtToken = authorizationHeader.split(' ')[1];
//       // set access_token as null
//       Users.update({access_token: null}, {where: {id: users.id}});
//       // const jwtTokenExpired = await JwtToken.create(data);
//       return res.status(200).send({jwtToken}, 'logout');
//     }
//     return res.status(401).send({'error3': 'User is not authenticated.'});
//   })(req, res, next);
// });

router.post('/logout', (req, res, next) => {
  // eslint-disable-next-line consistent-return
  passport.authenticate('jwt', {session: false}, async (err, users, info) => {
    if (err) {
      return res.status(401).send(err);
    }
    if (info !== undefined) {
      return res.status(401).send({'error': info.message});
    }
    // const authorizationHeader = req.headers.authorization;
    // const jwtToken = authorizationHeader.split(' ')[1];
    // if (users.accessToken == null) {
    //   return res.status(400).send('null');
    // }
    // set access_token as null
    if (users.id) {
      // set access_token as null
      Users.update({access_token: null}, {where: {id: users.id}});
      return res.status(200).send('logout');
    }
    return res.status(401).send('User is not authenticated');
  })(req, res, next);
});

module.exports = router;
