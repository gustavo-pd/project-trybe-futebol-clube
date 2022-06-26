import { Request, Response, NextFunction } from 'express';

class LoginMiddleware {
  static validEmail(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;
    const regex = /\S+@\S+\.\S+/; // https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript

    if (!email || email === '') {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    if (!(regex.test(email))) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    next();
  }

  static validPassword(req: Request, res: Response, next: NextFunction) {
    const { password } = req.body;

    if (!password || password === '') {
      return res.status(401).json({ message: 'Password is required' });
    }
    if (password.length < 7) {
      return res.status(401).json({ message: 'Password length must be 7 characters long or more' });
    }

    next();
  }
}

export default LoginMiddleware;
