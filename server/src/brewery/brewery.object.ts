import { Prisma } from '@prisma/client';

export const breweryObject: Prisma.BrewerySelect = {
    id: true,
    name: true,
    description: true,
    slug: true,
    drinks: true,
};
