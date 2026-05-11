import { Router } from 'express';
import { usersController } from '../controllers/users.controller';

const router = Router();

router.get('/', usersController.list);
router.get('/:id', usersController.getById);
router.post('/', usersController.create);

export default router;