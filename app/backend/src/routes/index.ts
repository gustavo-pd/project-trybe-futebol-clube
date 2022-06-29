import { Application as App } from 'express';
import matchRouter from './match';
import loginRouter from './login';
import teamRouter from './team';

const Routes = (app: App) => {
  app.use('/login', loginRouter);
  app.use('/teams', teamRouter);
  app.use('/matches', matchRouter);
};

export default Routes;
