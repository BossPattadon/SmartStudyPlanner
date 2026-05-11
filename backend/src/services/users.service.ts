import { prisma } from '../db';

export const usersService = {
    list: () => prisma.user.findMany({
        select: {
            id: true,
            email: true,
            name: true,
        }
    }),
    
    getById: (id: string) => prisma.user.findUnique({
        where: {
            id
        },
        select: {
            id: true,
            email: true,
            name: true,
        }
    }),

    create: (data: { email: string; name: string }) => prisma.user.create({
        data,
        select: {
            id: true,
            email: true,
            name: true,
        }
    })
};