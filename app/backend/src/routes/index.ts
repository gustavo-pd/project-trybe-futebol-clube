import { Application as App } from 'express';
import LoginMiddleware from '../middlewares/LoginMiddleware';
import Login from '../controllers/Login.controller';

const Routes = (app: App) => {
  app.get('/', (_req, res) => res.status(200).json('Sucesso'));
  app.post('/login', LoginMiddleware.validEmail, LoginMiddleware.validPassword, Login.UserLogin);
  app.get('/login/validate', Login.validateLogin);
};

export default Routes;
