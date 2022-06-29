import { Router } from 'express';
import MatchController from '../controllers/Match.controller';
import MatchMiddleware from '../middlewares/MatchMiddleware';

const router = Router();

const controller = new MatchController();

router.get('/', controller.getInProgressMatches);

router.post('/', MatchMiddleware.validTeams, controller.createMatch);

router.patch('/:id/finish', controller.updateProgressMatch);

router.patch('/:id', controller.editMatch);

export default router;
