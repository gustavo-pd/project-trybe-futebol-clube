import { Router } from 'express';
import TeamController from '../controllers/Team.controller';

const router = Router();

const controller = new TeamController();

router.get('/', controller.getAllTeams);

router.get('/:id', controller.getOneTeam);

export default router;
