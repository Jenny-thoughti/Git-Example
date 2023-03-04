const express = require('express');
const router = express.Router();

const {check, validationResult} = require('express-validator');
const models = require('../models');
const Users = models.User;
const JwtToken = models.JwtToken;
// const Models = require('../models');
const moment = require('moment');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/jwtConfig');
const {accessToken} = require('../validations/users-validation');
// const bcrypt = require('bcrypt');
// const authenticate = require('../middleware/auth-middleware');

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


// router.post('/logout', accessToken, async (req, res) => {
//   try {
//     const randomNumberToAppend = toString(Math.floor((Math.random() * 1000) + 1));
//     // const randomIndex = Math.floor((Math.random() * 10) + 1);
//     const hashedRandomNumberToAppend = await bcrypt.hash(randomNumberToAppend, 10);
//     // now just concat the hashed random number to the end of the token
//     req.token = req.token + hashedRandomNumberToAppend;
//     return res.status(200).json('logout');
//   } catch (err) {
//     return res.status(500).json(err.message);
//   }
// });

router.post('/logout', async (req, res, next) => {
  // eslint-disable-next-line consistent-return
  passport.authenticate('jwt', {session: false}, async (err, user, info) => {
    if (err) {
      return res.status(401).send({'error1': err});
    }
    if (info !== undefined) {
      return res.status(401).send({'error2': info.message});
    }
    const userId =parseInt(req.body.id, 100);
    console.log(user.id, userId);
    if (user.id === 4 ) {
      const authorizationHeader = req.headers.authorization;
      const expiredJwtToken = authorizationHeader.split(' ')[1];
      // const expiredJwtToken = 'Bearer';
      const data = {
        user_id: user.id,
        token: expiredJwtToken,
        createdAt: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: null,
        deletedAt: null,
        status: '0',
      };
      console.log(data);
      const jwtTokenExpired = await JwtToken.create(data);
      return res.status(200).send({'jwtToken': jwtTokenExpired});
    }
    return res.status(401).send({'error3': 'User is not authenticated.'});
  })(req, res, next);
});


// router.post('/logout', authenticate.auth, async (req, res) => {
//   try {
//     req.user.tokens = req.user.tokens.filter((token) =>{
//       return token.token !== req.token;
//     });
//     await req.user.save();
//     res.send();
//   } catch (error) {
//     res.status(500).send();
//   }
// });
module.exports = router;
