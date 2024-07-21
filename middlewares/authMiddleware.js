import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

import ApiError from '../utils/apiError.js';

const prisma = new PrismaClient();

const isAuth = asyncHandler(async (req, res, next) => {
  let decodedToken;

  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
    return next(new ApiError('Unauthorized', 401));
  }

  const token = req.headers.authorization.split(' ')[1];

  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (error) {
    return next(new ApiError('Invalid token', 401));
  }

  const user = await prisma.user.findUnique({
    where: {
      id: decodedToken.userId,
    },
  });

  if (!user)
    next(new ApiError('The user who belongs to this token does no longer exist', 401));

  req.user = user;
  next();
});

export default isAuth;
