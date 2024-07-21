import express from 'express';

import {
  createComment,
  deleteComment,
} from '../controllers/commentController.js';

import {
  createCommentValidator,
  deleteCommentValidator,
} from '../utils/validators/commentValidator.js';

import isAuth from '../middlewares/authMiddleware.js';

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(isAuth, createCommentValidator, createComment);

router
  .route('/:id')
  .delete(isAuth, deleteCommentValidator, deleteComment);

export default router;
