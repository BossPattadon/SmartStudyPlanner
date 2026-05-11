import { Router } from 'express';
import { prisma } from '../db'

const router = Router();

router.get('/', (req, res) => {
    res.json({ status : 'ok' });
});

router.get('/db-check', async (req, res) => {
    const userCount = await prisma.user.count();
    res.json({ db : 'connected', userCount })
});

export default router;