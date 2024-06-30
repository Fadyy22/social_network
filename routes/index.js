const authRouter = require('./authRoute');

const mountRoutes = (app) => {
  app.use('/auth', authRouter);
};

module.exports = mountRoutes;
