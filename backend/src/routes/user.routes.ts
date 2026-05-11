import { Router } from 'express';
import { usersController } from '../controllers/users.controller';
import { requireAuth } from '../middleware/requireAuth';

const router = Router();

router.get('/me', requireAuth, usersController.me)
router.get('/', usersController.list);
router.get('/:id', usersController.getById);
router.post('/', usersController.create);

export default router;