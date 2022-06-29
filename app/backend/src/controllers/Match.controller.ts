import { NextFunction, Request, Response } from 'express';
import IMatch from '../interfaces/IMatch.interface';
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

  createMatch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.headers;
      const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = req.body;
      if (!authorization) {
        return res.status(404).json({ message: 'Token not found' });
      }
      const newMatch: IMatch = {
        homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress,
      };
      const create = await this.service.createMatch(authorization, newMatch);

      return res.status(201).json(create);
    } catch (err) {
      next(err);
    }
  };

  updateProgressMatch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this.service.updateProgressMatch(id);
      return res.status(200).json({ message: 'Finished' });
    } catch (err) {
      next(err);
    }
  };
}

export default Match;
