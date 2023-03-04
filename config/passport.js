const bcrypt = require('bcrypt');
const jwtSecret = require('./jwtConfig');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models').User;


const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('Bearer'),
  secretOrKey: jwtSecret.secret,
};


passport.use(
    'login',
    new LocalStrategy(
        {
          usernameField: 'user_name',
          passwordField: 'password',
          session: false,
        },
        (user_name, password, done) => {
          try {
            User.findOne({
              where: {
                user_name,
              },
            }).then((users) => {
              if (users === null) {
                return done(null, false, {message: 'Invalid username.'});
              }
              bcrypt.compare(password, users.password).then((response) => {
                if (response !== true) {
                  return done(null, false, {message: 'Invalid credentials.'});
                }
                return done(null, users);
              });
            });
          } catch (err) {
            done(err);
          }
        },
    ),
);

passport.use(
    'jwt',
    new JWTstrategy(opts, (jwtPayload, done) => {
      try {
        User.findOne({
          where: {
            id: jwtPayload.id,
          },
        }).then((users) => {
          if (users) {
            const userData = {
              id: users.id,
            };
            done(null, userData);
          } else {
            done(null, false);
          }
        });
      } catch (err) {
        done(err);
      }
    }),
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
