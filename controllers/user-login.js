const models = require('../models');
const Users = models.User;
const bcrypt = require('bcrypt');
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

    req.session.loggedin = true;
    req.session.user_name = user.user_name;
    return res.redirect('/home');
  } catch (error) {
    return res.status(500).send({message: error.message});
  }
};

const home = async (req, res) => {
  if (req.session.loggedin) {
    return res.sendFile(path.join(__dirname + '/home.html'));
  } else {
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
