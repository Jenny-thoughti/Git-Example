const bcrypt = require('bcrypt');
const moment = require('moment');
const {validationResult} = require('express-validator');

const models = require('../models');

const Users = models.User;
const BCRYPT_SALT_ROUNDS = 12;

//  get all users
const getAllUsers = async (req, res) => {
  try {
    // const id = req.body.id;
    const usersData = await Users.count({});
    if (usersData == 0) {
      return res.status(404).send({'users': 'No data found'});
    }
    const users = await Users.scope(['withoutPassword', 'withoutToken']).findAndCountAll({});
    res.status(200).json({users});
  } catch (error) {
    return res.status(500).send(error.message);
  }
};


// get by Id
const getById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    const usersData = await Users.scope(['withoutPassword', 'withoutToken']).findByPk(id, {});
    if (usersData == null) {
      return res.status(404).send({'users': 'No data found'});
    }
    return res.status(200).send({
      'users': usersData,
    });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

//  scopes
const check = async (req, res) => {
  try {
    const scopes = req.params.status;
    const data = await Users.scope(['withoutPassword']).findAndCountAll({
      where: {
        status: scopes,
      },
    });
    res.status(200).json({'users': data});
  } catch (error) {
    return res.status(500).send(error.message);
  }
};


//  create
const addUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({
        success: false,
        errors: errors.array(),
      });
    }

    const userExists = await Users.findOne({
      where: {user_name: req.body.user_name},
    });
    if (userExists != null) {
      return res.status(404).send('username already exists');
    }

    const emailExists = await Users.findOne({
      where: {email: req.body.email},
    });
    if (emailExists != null) {
      return res.status(404).send('email already exists');
    }

    const {first_name, last_name, email, user_name, password, role, status, qualification} = req.body;
    const hash = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
    const info = {first_name, last_name, email, user_name, password: hash, role, status, qualification};

    const userCreate = await Users.create(info);
    res.status(200).send({'users': userCreate});
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

//  Update
const updateUsers = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    // Username already exits
    const userNameExists = await Users.findOne({
      where: {user_name: req.body.user_name},
    });
    if (userNameExists != null) {
      return res.status(400).send('username already exists');
    }

    // email already exits
    const userEmailExists = await Users.findOne({
      where: {email: req.body.email},
    });
    if (userEmailExists != null) {
      return res.status(400).send('email already exists');
    }

    const id = req.params.id;
    const {first_name, last_name, email, user_name, password, role, status, qualification} = req.body;
    const hash = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
    const date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    const info = {first_name, last_name, email, user_name, password: hash, role, status, qualification, updated_at: date};

    await Users.update(info, {where: {
      id: id}}).then((count) => {
      if ( !count ) {
        return res.status(404).send({error: 'No Users'});
      }
      res.status(200).send({'msg': 'updated'});
    });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};


const deleteUsers = async (req, res) => {
  try {
    const id = req.params.id;
    await Users.destroy({
      where: {
        id: id}}).then((count) => {
      if (!count) {
        return res.status(404).send({error: 'No user'});
      }
      res.status(200).send({msg: 'User is deleted'});
    });
  } catch (error) {
    return res.status(500).send(error.message);
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
