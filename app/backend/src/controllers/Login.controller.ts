import { NextFunction, Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import Users from '../database/models/user';
import IUser from '../interface/IUser';
import Token from '../auth/Token';

class Login {
  private static _user: IUser;

  static async UserLogin(req: Request, res: Response, _next: NextFunction): Promise<Response> {
    const { email, password } = req.body;
    this._user = await Users.findOne({ where: { email } }) as IUser;
    const validatePassword = await bcrypt.compare(password, this._user.password);
    const token = await Token.tokenGen(this._user);
    if (!this._user) {
      return res.status(401).json({ message: 'Invalid e-mail' });
    }
    if (!validatePassword) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    const user = {
      id: this._user.id,
      username: this._user.username,
      role: this._user.role,
      email,
    };
    return res.status(200).json({ user, token });
  }

  static async validateLogin(req: Request, res: Response, _next: NextFunction): Promise<Response> {
    const token = req.headers.authorization as string;
    const { role } = await Token.authToken(token);

    return res.status(200).send(role);
  }
}

export default Login;
