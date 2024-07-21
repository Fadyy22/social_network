import { validationResult } from 'express-validator';

export const globalValidatorMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array(), message: 'Validation Failed' });
  }
  next();
};

export const customValidatorMiddleware = (req, res, next) => {
  if (req.customError) {
    return res.status(req.customError.statusCode).json({ message: req.customError.message });
  }
  next();
};
