const bcrypt = require('bcrypt');
const moment = require('moment');
const {validationResult} = require('express-validator');

const helpers = require('../helpers/helpers');
const models = require('../models');

const Users = models.User;
const BCRYPT_SALT_ROUNDS = 12;

//  get all users
const getAllUsers = async (req, res) => {
  try {
    const usersData = await Users.count({});
    if (usersData == 0) {
      return helpers.generateApiResponse(res, req, 'No data found.', 404);
    }
    const users = await Users.scope(['withoutPassword', 'withoutToken']).findAndCountAll({});
    return helpers.generateApiResponse(res, req, 'Data found.', 200, users);
  } catch (error) {
    console.log('API:', error);
    return helpers.generateApiResponse(res, req, error.message, 500);
  }
};


// get by Id
const getById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const usersData = await Users.scope(['withoutPassword', 'withoutToken']).findByPk(id, {});
    if (usersData == null) {
      return helpers.generateApiResponse(res, req, 'No data found.', 404);
    }
    return helpers.generateApiResponse(res, req, 'Data found.', 200, usersData);
  } catch (error) {
    return helpers.generateApiResponse(res, req, error.message, 500);
  }
};

//  scopes add validation
const check = async (req, res) => {
  try {
    const scopes = req.params.status;
    const data = await Users.scope(['withoutPassword']).findAndCountAll({
      where: {
        status: scopes,
      },
    });
    return helpers.generateApiResponse(res, req, 'Sata found.', 200, data);
  } catch (error) {
    return helpers.generateApiResponse(res, req, error.message, 500);
  }
};


//  create
const addUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return helpers.generateApiResponse(res, req, errors.array(), 400);
    }

    const userExists = await Users.findOne({
      where: {user_name: req.body.user_name},
    });
    if (userExists != null) {
      return helpers.generateApiResponse(res, req, 'Username already exists.', 409);
    }

    const emailExists = await Users.findOne({
      where: {email: req.body.email},
    });
    if (emailExists != null) {
      return helpers.generateApiResponse(res, req, 'Email already exists', 409);
    }

    const {first_name, last_name, email, user_name, password, role, status, qualification} = req.body;
    const hash = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
    const info = {first_name, last_name, email, user_name, password: hash, role, status, qualification};
    const userCreate = await Users.create(info);
    helpers.generateApiResponse(res, req, 'Users created.', 200, userCreate);
  } catch (error) {
    return helpers.generateApiResponse(res, req, error.message, 500);
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
    const userNameExists = await Users.findOne({
      where: {user_name: req.body.user_name},
    });
    if (userNameExists != null) {
      return helpers.generateApiResponse(res, req, 'Username already exists.', 409);
    }

    // email already exits
    const userEmailExists = await Users.findOne({
      where: {email: req.body.email},
    });
    if (userEmailExists != null) {
      return helpers.generateApiResponse(res, req, 'email already exists.', 409);
    }

    const id = req.params.id;
    const {first_name, last_name, email, user_name, password, role, status, qualification} = req.body;
    const hash = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
    const date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    const info = {first_name, last_name, email, user_name, password: hash, role, status, qualification, updated_at: date};

    await Users.update(info, {where: {
      id: id}}).then((count) => {
      if ( !count ) {
        return helpers.generateApiResponse(res, req, 'No users.', 404);
      }
      helpers.generateApiResponse(res, req, 'Users Updated.', 200);
    });
  } catch (error) {
    return helpers.generateApiResponse(res, req, error.message, 500);
  }
};


const deleteUsers = async (req, res) => {
  try {
    const id = req.params.id;
    await Users.destroy({
      where: {
        id: id}}).then((count) => {
      if (!count) {
        return helpers.generateApiResponse(res, req, 'No Users Data.', 404);
      }
      helpers.generateApiResponse(res, req, 'Users is deleted.', 200);
    });
  } catch (error) {
    return helpers.generateApiResponse(res, req, error.message, 500);
  }
};


module.exports = {
  getAllUsers,
  getById,
  addUser,
  updateUsers,
  deleteUsers,
  check,
};
