import { NextFunction, Request, Response } from 'express';
import LeaderboardHomeService from '../services/LeaderboardHome.service';
import LeaderboardAwayService from '../services/LeaderboardAway.service';
import LeaderboardService from '../services/Leaderboard.service';

class LeaderboardHome {
  private serviceHome = new LeaderboardHomeService();
  private serviceAway = new LeaderboardAwayService();
  private service = new LeaderboardService();

  getLeaderboardHome = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const leaderboard = await this.serviceHome.getLeaderboard();
      return res.status(200).json(leaderboard);
    } catch (err) {
      next(err);
    }
  };

  getLeaderboardAway = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const leaderboard = await this.serviceAway.getLeaderboard();
      return res.status(200).json(leaderboard);
    } catch (err) {
      next(err);
    }
  };

  getLeaderboard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const leaderboard = await this.service.getLeaderboard();
      return res.status(200).json(leaderboard);
    } catch (err) {
      next(err);
    }
  };
}

export default LeaderboardHome;
