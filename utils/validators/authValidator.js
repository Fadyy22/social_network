const bcrypt = require('bcryptjs');
const { check, checkExact } = require('express-validator');
const { PrismaClient } = require('@prisma/client');

const {
  customValidatorMiddleware,
  globalValidatorMiddleware,
} = require('../../middlewares/validatorMiddleware');

const prisma = new PrismaClient();

exports.signupValidator = [
  check('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required')
    .isString()
    .withMessage('First name must be only characters')
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters'),
  check('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is required')
    .isString()
    .withMessage('Last name must be only characters')
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters'),
  check('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email is not valid')
    .bail()
    .custom(async (email, { req }) => {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (user) {
        return req.customError = {
          message: 'Email is already taken',
          statusCode: 409,
        };
      }
    }),
  customValidatorMiddleware,
  check('password')
    .trim()
    .isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
    .withMessage('Password must have a minimum length of 8 characters, with at least one lowercase letter, one uppercase letter, one number, and one special character')
    .customSanitizer(password => bcrypt.hashSync(password, 12)),
  checkExact([], { message: 'Unknown fileds' }),
  globalValidatorMiddleware,
];

exports.loginValidator = [
  check('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email is not valid'),
  check('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .bail()
    .custom(async (password, { req }) => {
      const user = await prisma.user.findUnique({
        where: {
          email: req.body.email,
        },
      });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return req.customError = {
          message: 'Invalid email or password',
          statusCode: 401,
        };
      }

      req.user = user;
    }),
  customValidatorMiddleware,
  globalValidatorMiddleware,
];
