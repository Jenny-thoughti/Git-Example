const moment = require('moment');
const {validationResult} = require('express-validator');

const models = require('../models');
const helpers = require('../helpers/helpers');

const Users = models.User;
const Posts = models.Post;


//  get all posts and include users
const getAllPosts = async (req, res) => {
  try {
    const includeUsers = [
      {
        model: Users,
        attributes: ['id', 'first_name', 'last_name', 'email', 'qualification'],
      },
    ];
    const postsData = await Posts.count();
    if (postsData == 0) {
      return helpers.generateApiResponse(res, req, 'No Data found.', 404);
    }
    const posts = await Posts.findAndCountAll({include: includeUsers});
    helpers.generateApiResponse(res, req, 'Posts Data found.', 200, posts);
  } catch (error) {
    return helpers.generateApiResponse(res, req, error.message, 500);
  }
};


// get by id
const getById = async (req, res) => {
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
      return helpers.generateApiResponse(res, req, 'No Data Found.', 404);
    }
    helpers.generateApiResponse(res, req, 'Posts Data.', 200, postData);
  } catch (error) {
    return helpers.generateApiResponse(res, req, error.message, 500);
  }
};


// create
const addPosts = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return helpers.generateApiResponse(res, req, errors.array(), 400);
    }

    // name already exists
    const postExists = await Posts.findOne({
      where: {name: req.body.name},
    });
    if (postExists != null) {
      return helpers.generateApiResponse(res, req, 'Posts with same name already exists', 409);
    }

    const {name, comment_status, user_id} = req.body;
    const data = {name, comment_status, user_id};

    const postCreate = await Posts.create(data);
    helpers.generateApiResponse(res, req, 'Posts created', 200, postCreate);
  } catch (error) {
    return helpers.generateApiResponse(res, req, error.message, 500);
  }
};


//  Update
const updatePosts = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return helpers.generateApiResponse(res, req, errors.array, 400);
    }
    // already exits
    const postExists = await Posts.findOne({
      where: {name: req.body.name},
    });
    if (postExists != null) {
      return helpers.generateApiResponse(res, req, 'Posts with same name already exists', 409);
    }

    const id = req.params.id;
    const {name, comment_status, user_id, created_at} = req.body;
    const date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    const info = {name, comment_status, user_id, created_at, updated_at: date};

    await Posts.update(info, {
      where: {
        id: id}}).then((count) => {
      if (!count) {
        return helpers.generateApiResponse(res, req, 'No posts', 404);
      }
      helpers.generateApiResponse(res, req, 'Posts Updated', 200);
    });
  } catch (error) {
    return helpers.generateApiResponse(res, req, error.message, 500);
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
        return helpers.generateApiResponse(res, req, 'No Posts Found', 404);
      }
      helpers.generateApiResponse(res, req, 'Posts deleted', 200);
    });
  } catch (error) {
    return helpers.generateApiResponse(res, req, error.message, 500);
  }
};


module.exports = {
  getAllPosts,
  getById,
  addPosts,
  updatePosts,
  deletePosts,
};
