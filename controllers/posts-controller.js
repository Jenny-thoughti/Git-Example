const models = require('../models');
const Users = models.User;
const Posts = models.Post;
const moment = require('moment');


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


//  get by id
const getById = async (req, res, err) => {
  try {
    const id = req.params.id;
    if (id <= 0) {
      res.status(404).send('No Posts');
    }
    const includeUsers = [
      {
        model: Users,
        attributes: ['first_name', 'last_name', 'email', 'qualification'],
      },
    ];
    const allPosts = await Posts.findByPk(id, {
      include: includeUsers,
    });

    return res.status(200).json({
      'posts': allPosts,
    });
  } catch (error) {
    return res.status(404).send(error.message);
  }
};


//  create
const addPosts = async (req, res) => {
  try {
    const info = {
      name: req.body.name,
      comment_status: req.body.comment_status,
      user_id: req.body.user_id,
    };

    const posts = await Posts.create(info);

    res.status(200).send({'posts': posts});
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

//  Update
const updatePosts = async (req, res) => {
  try {
    const id = req.params.id;
    const {name, comment_status, user_id, created_at} = req.body;
    const date = await moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    const info = {name, comment_status, user_id, created_at, updated_at: date};

    const posts = await Posts.update(info, {where: {id: id}});
    res.status(200).send(posts);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

// delete
const deletePosts = async (req, res) => {
  try {
    const id = req.params.id;
    await Posts.destroy({where: {id: id}});
    res.status(200).send('Posts is deleted !');
  } catch (error) {
    if (error) {
      if (Posts.length <= 0) {
        return res.status(404).send('Posts not found');
      }
    }
    return res.status(500).send(error.message);
  }
};

module.exports = {
  getAllPosts,
  getById,
  addPosts,
  updatePosts,
  deletePosts,
};
