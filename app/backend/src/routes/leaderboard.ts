import { Router } from 'express';
import LeaderboardController from '../controllers/Leaderboard.controller';

const router = Router();

const controller = new LeaderboardController();

router.get('/', controller.getLeaderboard);
router.get('/home', controller.getLeaderboardHome);
router.get('/away', controller.getLeaderboardAway);

export default router;
