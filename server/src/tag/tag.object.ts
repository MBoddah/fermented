import { Prisma } from '@prisma/client';

export const tagObject: Prisma.TagSelect = {
    id: true,
    name: true,
    slug: true,
};
