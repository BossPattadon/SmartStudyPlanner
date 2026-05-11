import { Request, Response } from 'express';
import { usersService } from '../services/users.service';

export const usersController = {
    async list(req: Request, res: Response) {
        const users = await usersService.list();
        res.json(users);
    },

    async getById(req: Request<{ id: string }>, res: Response) {
        const user = await usersService.getById(req.params.id);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.json(user);
    },

    async me(req: Request, res: Response) {
        if (!req.userId) {
            res.status(401).json({ error: 'not authenticated' });
            return;
        }
        const user = await usersService.getById(req.userId);
        res.json(user);
    },
};