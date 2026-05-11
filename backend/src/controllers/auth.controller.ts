import { Request, Response } from 'express';
import { authService } from '../services/auth.service';

export const authController = {
    async register(
        req: Request<{}, {}, { email: string; password: string; name: string }>,
        res: Response
    ) {
        const { email, password, name } = req.body;
        if ( !email || !password || !name ){
            res.status(400).json({ error : 'email, password, name are required' });
            return;
        }
        if (password.length < 6){
            res.status(400).json({ error : 'password must be at least 6 characters' });
            return;
        }
        const result = await authService.register(email, password, name);
        res.status(201).json(result);
    },

    async login(
        req: Request<{}, {}, { email: string; password: string; }>,
        res: Response,
    ) {
        const { email, password } = req.body;
        if ( !email || !password) {
            res.status(400).json({ error: 'email and password are required' });
            return;
        }
        const result = await authService.login(email, password);
        if (!result) {
            res.status(400).json({ error : 'Invalid credentials' });
            return;
        };
        res.json(result);
    }
}