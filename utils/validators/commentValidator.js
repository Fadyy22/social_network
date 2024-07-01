const { check, checkExact } = require('express-validator');
const { PrismaClient } = require('@prisma/client');

const {
  customValidatorMiddleware,
  globalValidatorMiddleware,
} = require('../../middlewares/validatorMiddleware');

const prisma = new PrismaClient();

exports.createCommentValidator = [
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

exports.deleteCommentValidator = [
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
