import { Router } from 'express';
import { usersController } from '../controllers/users.controller';
import { requireAuth } from '../middleware/requireAuth';

const router = Router();

router.get('/me', requireAuth, usersController.me)
router.get('/', requireAuth, usersController.list);
router.get('/:id', requireAuth, usersController.getById);

export default router;