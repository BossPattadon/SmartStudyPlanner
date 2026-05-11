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

    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
        res.status(401).json({ error : 'missing or invalid Authorization header' });
        return;
    }

    const token = header.slice('Bearer '.length);

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
        req.userId = decoded.sub;
        next();
    } catch {
        res.status(401).json({ error : 'Invalid or expired token' });
    }
};