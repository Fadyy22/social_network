const express = require('express');

const {
  createComment,
  deleteComment,
} = require('../controllers/commentController');


const {
  createCommentValidator,
  deleteCommentValidator,
} = require('../utils/validators/commentValidator');

const isAuth = require('../middlewares/authMiddleware');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(isAuth, createCommentValidator, createComment);

router
  .route('/:id')
  .delete(isAuth, deleteCommentValidator, deleteComment);

module.exports = router;
