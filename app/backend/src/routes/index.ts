import { Application as App } from 'express';
import LoginMiddleware from '../middlewares/LoginMiddleware';
import Login from '../controllers/Login.controller';

const Routes = (app: App) => {
  const controllerLogin = new Login();

  app.get('/', (_req, res) => res.status(200).json('Sucesso'));
  app.post(
    '/login',
    LoginMiddleware.validEmail,
    LoginMiddleware.validPassword,
    controllerLogin.userLogin,
  );
  app.get('/login/validate', controllerLogin.validateLogin);
};

export default Routes;
