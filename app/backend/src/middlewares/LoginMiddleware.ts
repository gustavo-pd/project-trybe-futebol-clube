import { Request, Response, NextFunction } from 'express';

class LoginMiddleware {
  static validEmail(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;
    const regex = /\S+@\S+\.\S+/; // https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript

    if (!email || email === '' || !(regex.test(email))) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    next();
  }

  static validPassword(req: Request, res: Response, next: NextFunction) {
    const { password } = req.body;

    if (!password || password === '' || password.length < 7) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    next();
  }
}

export default LoginMiddleware;
