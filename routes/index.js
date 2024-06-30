const authRouter = require('./authRoute');
const postRouter = require('./postRoute');

const mountRoutes = (app) => {
  app.use('/auth', authRouter);
  app.use('/posts', postRouter);
};

module.exports = mountRoutes;
