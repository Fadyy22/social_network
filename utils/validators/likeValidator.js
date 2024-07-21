import { check } from 'express-validator';
import { PrismaClient } from '@prisma/client';

import {
  customValidatorMiddleware,
  globalValidatorMiddleware,
} from '../../middlewares/validatorMiddleware.js';

const prisma = new PrismaClient();

export const likePostValidator = [
  check('id')
    .isString()
    .withMessage('Id must be a string')
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
  globalValidatorMiddleware,
];

export const unlikePostValidator = [
  check('id')
    .isString()
    .withMessage('Id must be a string')
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
  globalValidatorMiddleware,
];
