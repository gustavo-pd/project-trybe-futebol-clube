import { NextFunction, Request, Response } from 'express';
import MatchesService from '../services/Match.service';

class Match {
  private service = new MatchesService();

  getInProgressMatches = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let matches = [];
      const { inProgress } = req.query;
      if (!inProgress) {
        matches = await this.service.getAllMatches();
      } else {
        const query = inProgress !== 'false';
        matches = await this.service.getInProgressMatches(query);
      }
      return res.status(200).json(matches);
    } catch (err) {
      next(err);
    }
  };
}

export default Match;
