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
        res.cookie('auth_token', result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.status(201).json({ user: result.user });
    },

    async login(
        req: Request<{}, {}, { email: string; password: string; }>,
        res: Response,
    ) {
        const result = await authService.login(req.body.email, req.body.password);
        if (!result) {
            res.status(401).json({ error: 'invalid credentials' });
            return;
        }
        res.cookie('auth_token', result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        res.json({ user: result.user })
    },

    async logout(
        req: Request,
        res: Response,
    ) {
        res.clearCookie('auth_token');
        res.json({ ok: true });
    },
}