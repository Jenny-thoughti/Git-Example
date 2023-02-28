const {Router} = require('express');
const postsControllers = require('../controllers/postsController');

const router = Router();

router.get('/', postsControllers.getAllPosts);

router.get('/:id', postsControllers.getById);

router.post('/', postsControllers.addPosts);

router.put('/:id', postsControllers.updatePosts);

router.delete('/:id', postsControllers.deletePosts);


module.exports = router;
