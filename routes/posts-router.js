const {Router} = require('express');

const postsControllers = require('../controllers/posts-controller');
const {postDataValidate} = require('../validations/posts-validation');
const router = Router();

router.get('/', postsControllers.getAllPosts);

router.get('/:id', postsControllers.getById);

router.post('/', postDataValidate, postsControllers.addPosts);

router.put('/:id', postDataValidate, postsControllers.updatePosts);

router.delete('/:id', postsControllers.deletePosts);


module.exports = router;
