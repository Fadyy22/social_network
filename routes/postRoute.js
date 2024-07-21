import express from 'express';

import {
  createPost,
  getAllPosts,
  getPost,
  updatePost,
  deletePost,
} from '../controllers/postController.js';

import {
  createPostValidator,
  updatePostValidator,
  deletePostValidator,
} from '../utils/validators/postValidator.js';

import commentRouter from './commentRoute.js';
import likeRouter from './likeRoute.js';

import isAuth from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use('/:postId/comments', commentRouter);

router
  .route('/')
  .post(isAuth, createPostValidator, createPost)
  .get(isAuth, getAllPosts);

router
  .route('/:id')
  .get(isAuth, getPost)
  .patch(isAuth, updatePostValidator, updatePost)
  .delete(isAuth, deletePostValidator, deletePost);

router.post('/:id/like', isAuth, likeRouter.like);
router.delete('/:id/unlike', isAuth, likeRouter.unlike);

export default router;
