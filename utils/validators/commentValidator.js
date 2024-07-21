import { check, checkExact } from 'express-validator';
import { PrismaClient } from '@prisma/client';

import {
  customValidatorMiddleware,
  globalValidatorMiddleware,
} from '../../middlewares/validatorMiddleware.js';

const prisma = new PrismaClient();

export const createCommentValidator = [
  check('postId')
    .isString()
    .withMessage('postId must be a string')
    .bail()
    .custom(async (postId, { req }) => {
      const post = await prisma.post.findUnique({
        where: {
          id: postId,
        },
      });

      if (!post) {
        return req.customError = {
          statusCode: 404,
          message: 'Post not found',
        };
      }
    }),
  customValidatorMiddleware,
  check('content')
    .isLength({ min: 1, max: 500 })
    .withMessage('Content must be between 1 and 500 characters'),
  checkExact([], 'Unknown fields'),
  globalValidatorMiddleware,
];

export const deleteCommentValidator = [
  check('postId')
    .isString()
    .withMessage('postId must be a string')
    .bail()
    .custom(async (postId, { req }) => {
      const post = await prisma.post.findUnique({
        where: {
          id: postId,
        },
      });

      if (!post) {
        return req.customError = {
          statusCode: 404,
          message: 'Post not found',
        };
      }
    }),
  customValidatorMiddleware,
  check('id')
    .isString()
    .withMessage('id must be a string')
    .bail()
    .custom(async (id, { req }) => {
      const comment = await prisma.comment.findUnique({
        where: {
          id,
        },
      });

      if (!comment) {
        return req.customError = {
          statusCode: 404,
          message: 'Comment not found',
        };
      }

      if (comment.userId !== req.user.id) {
        return req.customError = {
          statusCode: 403,
          message: 'Unauthorized',
        };
      }
    }),
  customValidatorMiddleware,
  globalValidatorMiddleware,
];
