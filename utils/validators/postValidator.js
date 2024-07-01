const { check, checkExact } = require('express-validator');
const { PrismaClient } = require('@prisma/client');

const {
  customValidatorMiddleware,
  globalValidatorMiddleware,
} = require('../../middlewares/validatorMiddleware');

const prisma = new PrismaClient();

exports.createPostValidator = [
  check('content')
    .isLength({ min: 1, max: 500 })
    .withMessage('Content must be between 1 and 500 characters'),
  checkExact([], 'Unknown fields'),
  globalValidatorMiddleware,
];

exports.updatePostValidator = [
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
        req.customError = {
          statusCode: 404,
          message: 'Post not found',
        };
      } else if (post.authorId !== req.user.id) {
        req.customError = {
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

exports.deletePostValidator = [
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
        req.customError = {
          statusCode: 404,
          message: 'Post not found',
        };
      } else if (post.authorId !== req.user.id) {
        req.customError = {
          statusCode: 403,
          message: 'Unauthorized',
        };
      }
    }),
  customValidatorMiddleware,
  globalValidatorMiddleware,
];
