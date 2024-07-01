const authRouter = require('./authRoute');
const postRouter = require('./postRoute');
const userRouter = require('./userRoute');

const mountRoutes = (app) => {
  app.use('/auth', authRouter);
  app.use('/posts', postRouter);
  app.use('/users', userRouter);
};

module.exports = mountRoutes;
