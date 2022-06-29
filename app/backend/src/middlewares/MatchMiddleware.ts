import { Request, Response, NextFunction } from 'express';
import Team from '../models/Team.model';

class MatchMiddleware {
  static async validTeams(req: Request, res: Response, next: NextFunction) {
    const { homeTeam, awayTeam } = req.body;
    const modelTeam = new Team();
    const allTeams = await modelTeam.getAllTeams();

    if (homeTeam === awayTeam) {
      return res
        .status(401).json({ message: 'It is not possible to create a match with two equal teams' });
    }

    if (homeTeam < 1 || homeTeam > allTeams.length) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }

    if (awayTeam < 1 || awayTeam > allTeams.length) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }

    next();
  }
}

export default MatchMiddleware;
