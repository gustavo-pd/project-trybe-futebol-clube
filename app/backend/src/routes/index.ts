import { Application as App } from 'express';
import matchRouter from './match';
import loginRouter from './login';
import teamRouter from './team';
import leaderboardRouter from './leaderboard';

const Routes = (app: App) => {
  app.use('/login', loginRouter);
  app.use('/teams', teamRouter);
  app.use('/matches', matchRouter);
  app.use('/leaderboard', leaderboardRouter);
};

export default Routes;
