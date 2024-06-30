const express = require('express');

const {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
} = require('../controllers/postController');

const {
  createPostValidator,
  updatePostValidator,
  deletePostValidator,
} = require('../utils/validators/postValidator');

const isAuth = require('../middlewares/authMiddleware');

const router = express.Router();

router
  .route('/')
  .post(isAuth, createPostValidator, createPost)
  .get(getAllPosts);

router
  .route('/:id')
  .patch(isAuth, updatePostValidator, updatePost)
  .delete(isAuth, deletePostValidator, deletePost);

module.exports = router;
