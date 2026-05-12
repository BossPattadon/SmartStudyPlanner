import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

interface JWTPayload {
    sub: string;
};

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
};

export function requireAuth( req: Request, res: Response, next: NextFunction ) {
    if (!JWT_SECRET) {
        res.status(500).json({ error : 'JWT_SECRET not configured' });
        return;
    }

    const token = req.cookies?.auth_token;
    if (!token) {
        res.status(401).json({ error: 'not authenticated' });
        return;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
        req.userId = decoded.sub;
        next();
    } catch {
        res.status(401).json({ error : 'invalid or expired token' });
    }
};