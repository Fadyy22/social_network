const express = require('express');

const {
  createPost,
} = require('../controllers/postController');

const {
  createPostValidator,
} = require('../utils/validators/postValidator');

const isAuth = require('../middlewares/authMiddleware');

const router = express.Router();

router
  .route('/')
  .post(isAuth, createPostValidator, createPost);

module.exports = router;
