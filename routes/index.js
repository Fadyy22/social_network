import authRouter from './authRoute.js';
import postRouter from './postRoute.js';
import userRouter from './userRoute.js';

const mountRoutes = (app) => {
  app.use('/auth', authRouter);
  app.use('/posts', postRouter);
  app.use('/users', userRouter);
};

export default mountRoutes;
