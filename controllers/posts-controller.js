const models = require('../models');
const Users = models.User;
const Posts = models.Post;
const moment = require('moment');
const {validationResult} = require('express-validator');


//  get all posts and include users
const getAllPosts = async (req, res, err) => {
  try {
    const includeUsers = [
      {
        model: Users,
        attributes: ['id', 'first_name', 'last_name', 'email', 'qualification'],
      },
    ];
    const allPosts = await Posts.findAndCountAll({
      include: includeUsers,
    });
    return res.status(200).json({
      posts: allPosts,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};


// get by id
const getById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const includeUsers = [
      {
        model: Users,
        attributes: ['id', 'first_name', 'last_name', 'email', 'qualification'],
      },
    ];
    const postData = await Posts.findByPk(id, {
      attributes: [
        'id',
        'name',
        'comment_status',
        'user_id',
        'created_at',
        'updated_at',
      ],
      include: includeUsers,
    });
    if (postData == null) {
      return res.status(404).send({'posts': 'No data found'});
    }

    return res.status(200).send({
      'post': postData,
    });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};


// create
const addPosts = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    // if there is error then return Error
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    // name already exists
    const postExists = await Posts.findOne({
      where: {name: req.body.name},
    });
    if (postExists != null) {
      return res.status(404).send('Post with same name already exists');
    }

    const {name, comment_status, user_id} = req.body;
    const data = {name, comment_status, user_id};

    const postCreate = await Posts.create(data);
    res.status(200).json({'posts': postCreate});
  } catch (err) {
    return res.status(500).send(err.message);
  }
};


//  Update
const updatePosts = async (req, res) => {
  try {
    const errors = validationResult(req);
    // if there is error then return Error
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    // already exits
    const postExists = await Posts.findOne({
      where: {name: req.body.name},
    });
    if (postExists != null) {
      return res.status(400).send('Post with same name already exists');
    }

    const id = req.params.id;
    const {name, comment_status, user_id, created_at} = req.body;
    const date = await moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    const info = {name, comment_status, user_id, created_at, updated_at: date};

    await Posts.update(info, {
      where: {
        id: id}}).then((count) => {
      if (!count) {
        return res.status(404).send({'error': 'No Posts'});
      }
      res.status(200).send({'msg': 'updated'});
    });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};


// delete
const deletePosts = async (req, res) => {
  try {
    const id = req.params.id;
    await Posts.destroy({
      where: {
        id: id}}).then((count) => {
      if (!count) {
        return res.status(404).send({error: 'No Posts'});
      }
      res.status(200).send('Post is deleted');
    });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};


module.exports = {
  getAllPosts,
  getById,
  addPosts,
  updatePosts,
  deletePosts,
};
