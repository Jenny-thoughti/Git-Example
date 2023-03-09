const bcrypt = require('bcrypt');
const moment = require('moment');
const {validationResult} = require('express-validator');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const helpers = require('../helpers/helpers');
const models = require('../models');
const jwtSecret = require('../config/jwtConfig');

const BCRYPT_SALT_ROUNDS = 12;


//  get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await models.User.scope(['withoutPassword', 'withoutToken']).findAndCountAll();
    if (users.count <= 0) {
      return helpers.generateApiResponse(res, req, 'No data found.', 404);
    }
    helpers.generateApiResponse(res, req, 'Data found.', 200, users);
  } catch (error) {
    console.log('API:', error);
    return helpers.generateApiResponse(res, req, error, 500);
  }
};


// get by Id
const getById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const usersData = await models.User.scope(['withoutPassword', 'withoutToken']).findByPk(id, {});
    if (usersData == null) {
      return helpers.generateApiResponse(res, req, 'No data found.', 404);
    }
    return helpers.generateApiResponse(res, req, 'Data found.', 200, usersData);
  } catch (error) {
    return helpers.generateApiResponse(res, req, error, 500);
  }
};


//  scopes add validation
const check = async (req, res) => {
  try {
    const scopes = req.params.status;
    const data = await models.User.scope(['withoutPassword']).findAndCountAll({
      where: {
        status: scopes,
      },
    });
    if (scopes == 0 || scopes == 1) {
      return helpers.generateApiResponse(res, req, 'Data found.', 200, data);
    }
    helpers.generateApiResponse(res, req, 'Enter valid input', 400);
  } catch (error) {
    return helpers.generateApiResponse(res, req, error, 500);
  }
};


//  create
const addUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return helpers.generateApiResponse(res, req, errors, 400);
    }

    const userExists = await models.User.findOne({
      where: {user_name: req.body.userName},
    });
    if (userExists != null) {
      return helpers.generateApiResponse(res, req, 'Username already exists.', 409);
    }

    const emailExists = await models.User.findOne({
      where: {email: req.body.user_email},
    });
    if (emailExists != null) {
      return helpers.generateApiResponse(res, req, 'Email already exists', 409);
    }

    const {user_first_name, user_last_name, user_email, userName, user_password, user_role, user_status, user_qualification} = req.body;
    const hash = await bcrypt.hash(user_password, BCRYPT_SALT_ROUNDS);

    const info = {first_name: user_first_name, last_name: user_last_name, email: user_email, user_name: userName,
      password: hash, role: user_role, status: user_status, qualification: user_qualification};
    const userCreate = await models.User.create(info);
    helpers.generateApiResponse(res, req, 'Users created.', 200, userCreate);
  } catch (error) {
    return helpers.generateApiResponse(res, req, error, 500);
  }
};


//  Update
const updateUsers = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return helpers.generateApiResponse(res, req, errors.array(), 400);
    }

    // Username already exits
    const userNameExists = await models.User.findOne({
      where: {user_name: req.body.userName},
    });
    if (userNameExists != null) {
      return helpers.generateApiResponse(res, req, 'Username already exists.', 409);
    }

    // email already exits
    const userEmailExists = await models.User.findOne({
      where: {email: req.body.user_email},
    });
    if (userEmailExists != null) {
      return helpers.generateApiResponse(res, req, 'email already exists.', 409);
    }

    const id = req.params.id;
    const {user_first_name, user_last_name, user_email, userName, user_password, user_role, user_status,
      user_qualification} = req.body;
    const hash = await bcrypt.hash(user_password, BCRYPT_SALT_ROUNDS);
    const date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    const info = {first_name: user_first_name, last_name: user_last_name, email1: user_email, user_name: userName,
      password: hash, role: user_role, status: user_status, qualification: user_qualification, updated_at: date};

    await models.User.update(info, {where: {
      id: id}}).then((count) => {
      if ( !count ) {
        return helpers.generateApiResponse(res, req, 'No users.', 404);
      }
      helpers.generateApiResponse(res, req, 'Users Updated.', 200);
    });
  } catch (error) {
    return helpers.generateApiResponse(res, req, error, 500);
  }
};


// delete
const deleteUsers = async (req, res) => {
  try {
    const id = req.params.id;
    await models.User.destroy({
      where: {
        id: id}}).then((count) => {
      if (!count) {
        return helpers.generateApiResponse(res, req, 'No Users Data.', 404);
      }
      helpers.generateApiResponse(res, req, 'Users is deleted.', 200);
    });
  } catch (error) {
    return helpers.generateApiResponse(res, req, error, 500);
  }
};


// login
const userLogin = async (req, res, next) => {
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
        models.User.findOne({
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
          models.User.update({access_token: token}, {where: {id: users.id}});
          return helpers.generateApiResponse(res, req, 'Login successfully', 200, token);
        });
      });
    })(req, res, next);
  } catch (error) {
    helpers.generateApiResponse(res, req, error.message, 500);
  }
};


// home
const home = async (req, res, next) => {
  try {
    passport.authenticate('jwt', {session: false}, async (err, users, info) => {
      if (err) {
        return helpers.generateApiResponse(res, req, err, 401);
      }
      if (info !== undefined) {
        return helpers.generateApiResponse(res, req, info.message, 401);
      }
      const authData = {
        id: users.id,
      };
      const authorizationHeader = req.headers.authorization;
      const jwtToken = authorizationHeader.split(' ')[1];
      const data = await models.User.findOne({where: {access_token: jwtToken}});
      if (users.id) {
        if (data !== null) {
          return helpers.generateApiResponse(res, req, 'Welcome to Profile', 200, authData);
        }
        helpers.generateApiResponse(res, req, 'No Token Found', 404);
      }
      helpers.generateApiResponse(res, req, 'User is not authenticated', 401);
    })(req, res, next);
  } catch (err) {
    helpers.generateApiResponse(res, req, err, 500);
  }
};


// Logout
const logout = async (req, res, next) => {
  try {
    passport.authenticate('jwt', {session: false}, async (err, users, info) => {
      if (err) {
        return helpers.generateApiResponse(res, req, err, 401);
      }
      if (info !== undefined) {
        return helpers.generateApiResponse(res, req, info.message, 401);
      }
      const authorizationHeader = req.headers.authorization;
      const jwtToken = authorizationHeader.split(' ')[1];
      const data = await models.User.findOne({where: {access_token: jwtToken}});
      if (users.id) {
        if (data !== null) {
          await models.User.update({access_token: null}, {where: {id: users.id}});
          return helpers.generateApiResponse(res, req, 'Logout successfully', 200);
        }
        return helpers.generateApiResponse(res, req, 'No Token Found', 404);
      }
      return helpers.generateApiResponse(res, req, 'User is not authenticated', 401);
    })(req, res, next);
  } catch (err) {
    helpers.generateApiResponse(res, req, err, 500);
  }
};


module.exports = {
  getAllUsers,
  getById,
  addUser,
  updateUsers,
  deleteUsers,
  check,
  userLogin,
  home,
  logout,
};
