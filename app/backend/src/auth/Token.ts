import * as fs from 'fs/promises';
import * as jwt from 'jsonwebtoken';

class Token {
  tokenGen = async (user: string) => {
    const jwtToken = await fs.readFile('jwt.evaluation.key', 'utf-8');
    const token = jwt.sign({ user }, jwtToken, {
      expiresIn: '1d',
      algorithm: 'HS256',
    });

    return token;
  };

  tokenVerify = async (authorization: string) => {
    const jwtToken = await fs.readFile('jwt.evaluation.key', 'utf-8');
    const verified = jwt.verify(authorization, jwtToken);
    const findRole = Object.values(verified);
    const role = findRole.find((item) => (typeof item) === 'string');
    return role;
  };
}

export default Token;
