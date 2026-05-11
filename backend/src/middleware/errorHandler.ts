import { Request, Response, NextFunction } from 'express';

export function errorHandler(
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction,
) {
    console.error('[Error], err');

    if (typeof err === 'object' && err !== null && 'code' in err) {
        const code = (err as {code: string}).code;

        if (code === 'P2002') {
            res.status(409).json({ error: 'Unique constraint violated' });
            return;
        }
        if (code === 'P2025') {
            res.status(404).json({ error: 'Record not found' })
            return;
        }
    }

    const message = err instanceof Error ? err.message : 'Internal server error';
    res. status(500).json({ err: message });
}