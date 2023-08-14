import { Prisma } from '@prisma/client';
import { breweryObject } from 'src/brewery/brewery.object';
import { tagObject } from 'src/tag/tag.object';

export const drinkObject: Prisma.DrinkSelect = {
    id: true,
    slug: true,
    name: true,
    description: true,
    images: true,
    brewery: {
        select: breweryObject,
    },
    tags: {
        select: tagObject,
    },
};
