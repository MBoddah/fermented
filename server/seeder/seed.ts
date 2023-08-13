import { faker } from '@faker-js/faker';
import { Drink, PrismaClient, VoteType } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as slug from 'slug';

function getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function tossCoin(): boolean {
    return Math.random() > 0.5 ? true : false;
}

dotenv.config();
const prisma = new PrismaClient();

const createDrinks = async (quantity: number) => {
    const drinks: Drink[] = [];

    for (let i = 0; i < quantity; i++) {
        const drinkName = faker.commerce.productName();
        const tagName = faker.commerce.department();
        const breweryName = faker.company.name();

        const drink = await prisma.drink.create({
            data: {
                name: drinkName,
                slug: slug(breweryName + '-' + tagName + '-' + drinkName),
                description: faker.commerce.productDescription(),
                images: Array.from({ length: getRandomNumber(2, 6) }).map(() => faker.image.url()),
                tag: {
                    create: {
                        name: tagName,
                        slug: slug(tagName),
                    },
                },
                brewery: {
                    create: {
                        name: breweryName,
                        slug: slug(breweryName),
                        description: faker.company.catchPhrase(),
                    },
                },
                sensories: {
                    create: [
                        {
                            authorId: 1,
                            text: faker.lorem.paragraph(),
                            rating: getRandomNumber(1, 5),
                            images: Array.from({ length: getRandomNumber(1, 3) }).map(() =>
                                faker.image.url(),
                            ),
                        },
                        {
                            authorId: 2,
                            text: faker.lorem.paragraph(),
                            rating: getRandomNumber(1, 5),
                            images: Array.from({ length: getRandomNumber(1, 3) }).map(() =>
                                faker.image.url(),
                            ),
                        },
                        {
                            authorId: 3,
                            text: faker.lorem.paragraph(),
                            rating: getRandomNumber(1, 5),
                            images: Array.from({ length: getRandomNumber(1, 3) }).map(() =>
                                faker.image.url(),
                            ),
                        },
                    ],
                },
                votes: {
                    create: [
                        {
                            userId: 1,
                            type: tossCoin() ? VoteType.UP : VoteType.DOWN,
                        },
                        {
                            userId: 2,
                            type: tossCoin() ? VoteType.UP : VoteType.DOWN,
                        },
                        {
                            userId: 3,
                            type: tossCoin() ? VoteType.UP : VoteType.DOWN,
                        },
                    ],
                },
            },
        });

        drinks.push(drink);
    }

    console.log(`Created ${drinks.length} drinks`);
};

async function main() {
    console.log('Start seeding...');
    await createDrinks(10);
}

main()
    .catch(e => console.log(e))
    .finally(async () => await prisma.$disconnect());
