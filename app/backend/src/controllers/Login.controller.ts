import { NextFunction, Request, Response } from 'express';
import { compare } from 'bcryptjs';
import Token from '../auth/Token';
import LoginService from '../services/Login.service';

class Login {
  private jwtToken = new Token();
  private service = new LoginService();

  userLogin = async (req: Request, res: Response, _next: NextFunction) => {
    const { email, password } = req.body;
    const findUser = await this.service.getOneUser(email);
    if (!findUser) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    const validatePassword = await compare(password, findUser.password);
    if (!validatePassword) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    const user = {
      id: findUser.id,
      username: findUser.username,
      role: findUser.role,
      email,
    };

    const token = await this.jwtToken.tokenGen(user.role);
    return res.status(200).json({ user, token });
  };

  validateLogin = async (req: Request, res: Response, _next: NextFunction) => {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const verifyTk = await this.jwtToken.tokenVerify(authorization);
    return res.status(200).send(verifyTk);
  };
}

export default Login;
