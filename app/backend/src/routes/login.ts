import { Router } from 'express';
import LoginController from '../controllers/Login.controller';
import LoginMiddleware from '../middlewares/LoginMiddleware';

const router = Router();

const controller = new LoginController();

router.post(
  '/',
  LoginMiddleware.validEmail,
  LoginMiddleware.validPassword,
  controller.userLogin,
);

router.get('/validate', controller.validateLogin);

export default router;
