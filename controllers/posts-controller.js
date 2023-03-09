const moment = require('moment');
const {validationResult} = require('express-validator');

const models = require('../models');
const helpers = require('../helpers/helpers');


//  get all posts and include users
const getAllPosts = async (req, res) => {
  try {
    const includeUsers = [
      {
        model: models.User,
        attributes: ['id', 'first_name', 'last_name', 'email', 'qualification'],
      },
    ];
    const posts = await models.Post.findAndCountAll({include: includeUsers});
    if (posts.count <= 0) {
      return helpers.generateApiResponse(res, req, 'No Data found.', 404);
    }
    helpers.generateApiResponse(res, req, 'Posts Data found.', 200, posts);
  } catch (error) {
    return helpers.generateApiResponse(res, req, error, 500);
  }
};


// get by id
const getById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const includeUsers = [
      {
        model: models.User,
        attributes: ['id', 'first_name', 'last_name', 'email', 'qualification'],
      },
    ];
    const postData = await models.Post.findByPk(id, {
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
      return helpers.generateApiResponse(res, req, errors, 400);
    }

    // name already exists
    const postExists = await models.Post.findOne({
      where: {name: req.body.post_name},
    });
    if (postExists != null) {
      return helpers.generateApiResponse(res, req, 'Posts with same name already exists', 409);
    }

    const {post_name, post_comment, post_user_id} = req.body;
    const data = {name: post_name, comment_status: post_comment, user_id: post_user_id};

    const postCreate = await models.Post.create(data);
    helpers.generateApiResponse(res, req, 'Posts created', 200, postCreate);
  } catch (error) {
    console.log('Error for validation:', error);
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
    const postExists = await models.Post.findOne({
      where: {name: req.body.post_name},
    });
    if (postExists != null) {
      return helpers.generateApiResponse(res, req, 'Posts with same name already exists', 409);
    }

    const id = req.params.id;
    const {post_name, post_comment, post_user_id} = req.body;
    const date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    const info = {name: post_name, comment_status: post_comment, user_id: post_user_id, created_at, updated_at: date};

    await models.Post.update(info, {
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
    await models.Post.destroy({
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
