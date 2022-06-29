import { Application as App } from 'express';
import LoginMiddleware from '../middlewares/LoginMiddleware';
import MatchMiddleware from '../middlewares/MatchMiddleware';
import Login from '../controllers/Login.controller';
import Team from '../controllers/Team.controller';
import Match from '../controllers/Match.controller';

const Routes = (app: App) => {
  const controllerLogin = new Login();
  const controllerTeam = new Team();
  const controllerMatch = new Match();

  app.post(
    '/login',
    LoginMiddleware.validEmail,
    LoginMiddleware.validPassword,
    controllerLogin.userLogin,
  );
  app.get('/login/validate', controllerLogin.validateLogin);
  app.get('/teams', controllerTeam.getAllTeams);
  app.get('/teams/:id', controllerTeam.getOneTeam);
  app.get('/matches', controllerMatch.getInProgressMatches);
  app.post('/matches', MatchMiddleware.validTeams, controllerMatch.createMatch);
  app.patch('matches/:id/finish', controllerMatch.updateProgressMatch);
};

export default Routes;
