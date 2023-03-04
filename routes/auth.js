const express = require('express');
const router = express.Router();

const {check, validationResult} = require('express-validator');
const models = require('../models');
const Users = models.User;
// const Models = require('../models');
// const moment = require('moment');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/jwtConfig');
const {accessToken} = require('../validations/users-validation');

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
              first_name: users.first_name,
              last_name: users.last_name,
              email: users.email,
              user_name: users.user_name,
              role: users.role,
            };
            const token = jwt.sign(jwtData, jwtSecret.secret, {
              expiresIn: 60 * 15, // 15 Min
            });
            return res.status(200).send({auth: true, id: users.id, token});
          });
        });
      })(req, res, next);
    },
);

// router.post('/logout', passport.authenticate('jwt', {session: false}), (req, res) => {
//   res.clearCookie('access_token');
//   res.json({user: {user_name: '', role: ''}, success: true});
// });


// router.post('/logout', (req, res, next) => {
//   // req.logout(function(err) {
//   //   if (err) {
//   //     return next(err);
//   //   }
//   //   res.redirect('/users');
//   // });
//   passport.authenticate('jwt', {session: false}, async (err, users, info) => {
//     if (err) {
//       return res.status(401).send(err);
//     }
//     const usersId = parseInt(req.body.user_id, 10);
//     if (users.id === usersId) {
//       const authorizationHeader = req.headers.authorization;
//       const expiredJwtToken = authorizationHeader.split(' ')[1];
//       const data = {
//         token: expiredJwtToken,
//         createdAt: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
//         updatedAt: null,
//       };
//       const jwtTokenExpired = models.JwtToken.create(data, {
//         returning: true,
//         plain: true,
//       });
//       console.log(req.body.id);
//       return res.status(200).send('Log out successful', {jwtToken: jwtTokenExpired});
//     }
//     return res.status(401).send('User is not authenticated.');
//   })(req, res, next);
// });


// router.post('/logout', (req, res, next) => {
//   // eslint-disable-next-line consistent-return
//   passport.authenticate('jwt', {session: false}, async (err, user, info) => {
//     if (err) {
//       return res.status(401).send({'error1': err});
//     }
//     if (info !== undefined) {
//       return res.status(401).send({'error2': info.message});
//     }
//     const userId = parseInt(req.body.userId, 10);
//     if (user.id === userId) {
//       const authorizationHeader = req.headers.authorization;
//       const expiredJwtToken = authorizationHeader.split(' ')[1];
//       // const expiredJwtToken = 'Bearer';
//       const data = {
//         token: expiredJwtToken,
//         createdAt: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
//         updatedAt: null,
//         deletedAt: null,
//         status: '0',
//       };
//       const jwtTokenExpired = Models.JwtToken.create(data, {
//         returning: true,
//         plain: true,
//       });
//       return res.status(200).send({jwtToken: jwtTokenExpired});
//     }
//     return res.status(401).send({'error3': 'User is not authenticated.'});
//   })(req, res, next);
// });
// '$BiwK5D2JZK%K-iG_olJf5@7617Eu2Rx'


// home
router.get('/home', accessToken, (req, res)=> {
  jwt.verify(req.token, jwtSecret.secret, (err, users)=>{
    const authData = {
      id: users.id,
      role: users.role,
    };
    if (err) {
      res.status(403).send(err);
    } else {
      res.json({
        message: 'Welcome to Profile',
        userData: authData,
      });
    }
  });
});


// Verify Token
// eslint-disable-next-line require-jsdoc
// function accessToken(req, res, next) {
//   // Auth header value = > send token into header

//   const bearerHeader = req.headers['authorization'];
//   // check if bearer is undefined
//   if (typeof bearerHeader !== 'undefined') {
//     // split the space at the bearer
//     const bearer = bearerHeader.split(' ');
//     // Get token from string
//     const bearerToken = bearer[1];

//     // set the token
//     req.token = bearerToken;

//     // next middleweare
//     next();
//   } else {
//     // Fobidden
//     res.sendStatus(403);
//   }
// }

module.exports = router;
