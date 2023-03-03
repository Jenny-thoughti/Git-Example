const models = require('../models');
const Users = models.User;
const bcrypt = require('bcrypt');
// const config = require('../config/auth-config.js');
// const jwt = require('jsonwebtoken');
// const express = require('express');
// const session = require('express-session');
const path = require('path');


const login = async (req, res) => {
  res.sendFile(path.join(__dirname + '/login.html'));
};

const userAuth = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: {
        user_name: req.body.user_name,
      },
    });

    if (!user) {
      return res.status(404).send({message: 'User Not found.'});
    }

    const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password,
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        message: 'Invalid Password!',
      });
    }

    // const token = jwt.sign({id: user.id}, config.secret, {
    //   expiresIn: 86400, // 24 hours
    // });

    req.session.loggedin = true;
    req.session.user_name = user.user_name;
    // req.session.token = token;
    return res.redirect('/home');
    // return res.send({
    //   id: user.id,
    //   user_name: user.user_name,
    //   email: user.email,
    // });
  } catch (error) {
    return res.status(500).send({message: error.message});
  }
};

const home = async (req, res) => {
  if (req.session.loggedin) {
  //   // Output username
    return res.sendFile(path.join(__dirname + '/home.html'));
    // res.send('Welcome back, ' + req.session.user_name + '!');
  } else {
    // Not logged in
    res.send('Please login to view this page!');
  }
};

const logout = async (req, res) => {
  try {
    req.logout();
    return res.redirect('/home');
  } catch (err) {
    res.send(err);
  }
};

module.exports = {
  userAuth,
  home,
  login,
  logout,
};
