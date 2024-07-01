const { check } = require('express-validator');
const { PrismaClient } = require('@prisma/client');

const {
  customValidatorMiddleware,
  globalValidatorMiddleware,
} = require('../../middlewares/validatorMiddleware');

const prisma = new PrismaClient();

exports.likePostValidator = [
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

exports.unlikePostValidator = [
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
