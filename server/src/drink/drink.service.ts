import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { drinkObject } from './drink.object';
import { NotFoundException } from '@nestjs/common/exceptions';
import * as slug from 'slug';
import { DrinkDto } from './drink.dto';
import { BreweryService } from 'src/brewery/brewery.service';

@Injectable()
export class DrinkService {
    constructor(private prisma: PrismaService, private breweryService: BreweryService) {}

    // async getAll(dto: DrinkDto){

    // }

    //Get drink by id
    async byId(id: number) {
        const drink = await this.prisma.drink.findUnique({
            where: {
                id,
            },
            select: drinkObject,
        });

        if (!drink) throw new NotFoundException('Drink not found');

        return drink;
    }

    //Get drink by slug
    async bySlug(slug: string) {
        const drink = await this.prisma.drink.findUnique({
            where: {
                slug,
            },
            select: drinkObject,
        });

        if (!drink) throw new NotFoundException('Drink not found');

        return drink;
    }

    //Get drinks by tag
    async byTag(slug: string) {
        const drinks = await this.prisma.drink.findMany({
            where: {
                tags: {
                    some: {
                        slug,
                    },
                },
            },
            orderBy: {
                id: 'asc',
            },
            select: drinkObject,
        });

        return drinks;
    }

    //Get drinks by brewery
    async byBrewery(id: number) {
        const drinks = await this.prisma.drink.findMany({
            where: {
                brewery: {
                    id,
                },
            },
            orderBy: {
                id: 'asc',
            },
            select: drinkObject,
        });

        if (!drinks) throw new NotFoundException('Drinks not found');

        return drinks;
    }

    async getSimilar(id: number) {
        await this.byId(id);

        const { tags } = await this.prisma.drink.findUnique({
            where: {
                id,
            },
            select: {
                tags: true,
            },
        });

        const tagIds = tags.map(t => t.id);

        const similar = await this.prisma.drink.findMany({
            where: {
                tags: {
                    some: {
                        id: { in: tagIds },
                    },
                },
                NOT: {
                    id,
                },
            },
            select: drinkObject,
        });
        return similar;
    }

    async create(breweryId: number, dto: DrinkDto) {
        //Get brewery name
        const { name: breweryName } = await this.breweryService.byId(breweryId);
        const drinkSlug = slug(breweryName + '-' + dto.name);

        if (await this.isSlugUsedByBrewery(breweryId, drinkSlug))
            throw new BadRequestException('Drink with this name already exists');

        return await this.prisma.drink.create({
            data: {
                name: dto.name,
                description: dto.description,
                slug: drinkSlug,
                brewery: {
                    connect: {
                        id: breweryId,
                    },
                },
            },
        });
    }

    async update(id: number, dto: DrinkDto) {
        //Get drink current data
        const drink = await this.byId(id);
        const drinkSlug = slug(drink.brewery.name + '-' + dto.name);
        const tagConnections = dto.tagIds.map(id => {
            return { id };
        });

        if (await this.isSlugUsedByBrewery(drink.brewery.id, drinkSlug, id))
            throw new BadRequestException('Drink with this name already exists');

        return this.prisma.drink.update({
            where: {
                id,
            },
            data: {
                name: dto.name,
                description: dto.description,
                images: dto.images,
                slug: drinkSlug,
                tags: {
                    connect: tagConnections,
                },
            },
        });
    }

    async delete(id: number) {
        return this.prisma.drink.delete({ where: { id } });
    }

    async isSlugUsedByBrewery(breweryId: number, slug: string, drinkId?: number) {
        //Check if this drink name in use in this brewery
        const breweryDrinks = await this.byBrewery(breweryId);

        if (breweryDrinks.some(d => d.slug === slug && d.id != drinkId)) return true;

        return false;
    }
}
