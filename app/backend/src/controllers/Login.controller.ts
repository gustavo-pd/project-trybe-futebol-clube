import { NextFunction, Request, Response } from 'express';
import { compare } from 'bcryptjs';
import Users from '../database/models/user';
import Token from '../auth/Token';

class Login {
  private jwtToken = new Token();

  userLogin = async (req: Request, res: Response, _next: NextFunction) => {
    const { email, password } = req.body;
    const findUser = await Users.findOne({ where: { email } });
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
