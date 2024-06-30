const express = require('express');

const {
  createPost,
  getAllPosts,
} = require('../controllers/postController');

const {
  createPostValidator,
} = require('../utils/validators/postValidator');

const isAuth = require('../middlewares/authMiddleware');

const router = express.Router();

router
  .route('/')
  .post(isAuth, createPostValidator, createPost)
  .get(getAllPosts);

module.exports = router;
