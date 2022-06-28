import { NextFunction, Request, Response } from 'express';
import TeamService from '../services/Team.service';

class Team {
  private service = new TeamService();

  getAllTeams = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const allTeams = await this.service.getAllTeams();
      return res.status(200).json(allTeams);
    } catch (err) {
      next(err);
    }
  };

  getOneTeam = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id, 10);
      const team = await this.service.getOneTeam(id);
      if (!team) {
        return res.status(404).json({ message: 'Team not found' });
      }
      return res.status(200).json(team);
    } catch (err) {
      next(err);
    }
  };
}

export default Team;
