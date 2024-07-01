const express = require('express');

const {
  createPost,
  getAllPosts,
  getPost,
  updatePost,
  deletePost,
} = require('../controllers/postController');

const {
  createPostValidator,
  updatePostValidator,
  deletePostValidator,
} = require('../utils/validators/postValidator');

const commentRouter = require('./commentRoute');
const likeRouter = require('./likeRoute');

const isAuth = require('../middlewares/authMiddleware');

const router = express.Router();

router.use('/:postId/comments', commentRouter);

router
  .route('/')
  .post(isAuth, createPostValidator, createPost)
  .get(getAllPosts);

router
  .route('/:id')
  .get(getPost)
  .patch(isAuth, updatePostValidator, updatePost)
  .delete(isAuth, deletePostValidator, deletePost);


router.post('/:id/like', isAuth, likeRouter.like);
router.delete('/:id/unlike', isAuth, likeRouter.unlike);

module.exports = router;
