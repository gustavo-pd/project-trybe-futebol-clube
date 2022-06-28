import { NextFunction, Request, Response } from 'express';
import MatchesService from '../services/Match.service';

class Match {
  private service = new MatchesService();

  getAllMatches = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const allMatches = await this.service.getAllMatches();
      return res.status(200).json(allMatches);
    } catch (err) {
      next(err);
    }
  };
}

export default Match;
