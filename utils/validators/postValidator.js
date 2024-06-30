const { check, checkExact } = require('express-validator');

const {
  globalValidatorMiddleware,
} = require('../../middlewares/validatorMiddleware');

exports.createPostValidator = [
  check('content')
    .isLength({ min: 1, max: 500 })
    .withMessage('Content must be between 1 and 500 characters'),
  checkExact([], 'Unknown fields'),
  globalValidatorMiddleware,
];
