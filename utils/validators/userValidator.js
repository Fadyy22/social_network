const { check } = require('express-validator');
const { PrismaClient } = require('@prisma/client');

const {
  customValidatorMiddleware,
  globalValidatorMiddleware,
} = require('../../middlewares/validatorMiddleware');

const prisma = new PrismaClient();

exports.addFriendValidator = [
  check('id')
    .isString()
    .withMessage('Id must be a string')
    .bail()
    .custom(async (id, { req }) => {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      });

      if (!user) {
        return req.customError = {
          statusCode: 404,
          message: 'User not found',
        };
      }

      const me = await prisma.user.findUnique({
        where: {
          id: req.user.id,
        },
        include: {
          friends: {
            select: {
              id: true,
            }
          },
          friendRequests: {
            select: {
              id: true,
            }
          }
        },
      });

      const isFriend = me.friends.some(friend => friend.id === id);
      if (isFriend) {
        return req.customError = {
          statusCode: 409,
          message: 'Already friends',
        };
      }

      const isRequested = me.friendRequests.some(request => request.id === id);
      if (isRequested) {
        return req.customError = {
          statusCode: 409,
          message: 'Request already sent',
        };
      }
    }),
  customValidatorMiddleware,
  globalValidatorMiddleware,
];

exports.acceptFriendRequestValidator = [
  check('id')
    .isString()
    .withMessage('Id must be a string')
    .bail()
    .custom(async (id, { req }) => {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
        include: {
          friendRequests: {
            select: {
              id: true,
            }
          }
        }
      });

      if (!user) {
        return req.customError = {
          statusCode: 404,
          message: 'User not found',
        };
      }

      const isRequested = user.friendRequests.some(request => request.id === req.user.id);
      if (!isRequested) {
        return req.customError = {
          statusCode: 404,
          message: 'No request found',
        };
      }
    }),
  customValidatorMiddleware,
  globalValidatorMiddleware,
];
