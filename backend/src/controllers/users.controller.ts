import { Request, response, Response } from 'express';
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

    async create(req: Request, res: Response) {
        const { email, name } = req.body;
        if (!email || !name) {
            res.status(400).json({ error : 'email and name are required' });
            return;
        }
        const user = await usersService.create({ email, name });
        res.status(201).json(user);
    }
}