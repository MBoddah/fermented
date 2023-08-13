import { Prisma } from '@prisma/client';

export const userObject: Prisma.UserSelect = {
    id: true,
    email: true,
    firstName: true,
    lastName: true,
    avatarPath: true,
    password: false,
};
