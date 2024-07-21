import { check, checkExact } from 'express-validator';
import { PrismaClient } from '@prisma/client';

import {
  customValidatorMiddleware,
  globalValidatorMiddleware,
} from '../../middlewares/validatorMiddleware.js';

const prisma = new PrismaClient();

export const createPostValidator = [
  check('content')
    .isLength({ min: 1, max: 500 })
    .withMessage('Content must be between 1 and 500 characters'),
  checkExact([], 'Unknown fields'),
  globalValidatorMiddleware,
];

export const updatePostValidator = [
  check('id')
    .isString()
    .withMessage('Id must be a string')
    .bail()
    .custom(async (id, { req }) => {
      const post = await prisma.post.findUnique({
        where: {
          id,
        },
      });

      if (!post) {
        return req.customError = {
          statusCode: 404,
          message: 'Post not found',
        };
      }

      if (post.authorId !== req.user.id) {
        return req.customError = {
          statusCode: 403,
          message: 'Unauthorized',
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

export const deletePostValidator = [
  check('id')
    .isString()
    .withMessage('Id must be a string')
    .bail()
    .custom(async (id, { req }) => {
      const post = await prisma.post.findUnique({
        where: {
          id,
        },
      });

      if (!post) {
        return req.customError = {
          statusCode: 404,
          message: 'Post not found',
        };
      }

      if (post.authorId !== req.user.id) {
        return req.customError = {
          statusCode: 403,
          message: 'Unauthorized',
        };
      }
    }),
  customValidatorMiddleware,
  globalValidatorMiddleware,
];
