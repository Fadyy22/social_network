import jwt from 'jsonwebtoken';

const createToken = (payload) => {
  return jwt.sign({ userId: payload }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRATION });
};

export default createToken;
