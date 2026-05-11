import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../db';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = '7d';

function signToken(userId: string): string {
    if (!JWT_SECRET) throw new Error('JWT_SECRET not configured');
    return jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const authService = {
    async register(email: string, password: string, name: string) {
        const passwordHash = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { 
                email, 
                password: passwordHash, 
                name
            },
            select: {
                id: true,
                email: true,
                name: true
            }
        });
        const token = signToken(user.id);
        return { user, token };
    },

    async login(email: string, password: string) {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });
        if (!user) return null;

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return null;

        const token = signToken(user.id);
        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            },
            token,
        };
    },
};