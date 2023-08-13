import { Prisma } from '@prisma/client';
import { drinkObject } from 'src/drink/drink.object';
import { userObject } from 'src/user/user.object';

export const sensoryObject: Prisma.SensorySelect = {
    id: true,
    createdAt: true,
    author: {
        select: userObject,
    },
    drink: {
        select: drinkObject,
    },
    text: true,
    rating: true,
};
