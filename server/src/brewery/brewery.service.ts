import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { breweryObject } from './brewery.object';
import { BreweryDto } from './brewery.dto';
import * as slug from 'slug';

@Injectable()
export class BreweryService {
    constructor(private prisma: PrismaService) {}

    //Get brewery by id
    async byId(id: number) {
        const brewery = await this.prisma.brewery.findUnique({
            where: {
                id,
            },
            select: breweryObject,
        });

        if (!brewery) throw new NotFoundException('Brewery not found');

        return brewery;
    }

    //Get brewery by slug
    async bySlug(slug: string) {
        const brewery = await this.prisma.brewery.findUnique({
            where: {
                slug,
            },
            select: breweryObject,
        });

        if (!brewery) throw new NotFoundException('Brewery not found');

        return brewery;
    }

    //Get all breweries
    async getAll() {
        return this.prisma.brewery.findMany({
            select: breweryObject,
        });
    }

    //Update brewery
    async update(id: number, dto: BreweryDto) {
        //Check if brewery exists
        await this.byId(id);

        const brewerySlug = slug(dto.name);

        if (await this.isSlugUsed(brewerySlug, id))
            throw new BadRequestException('Brewery with this name already exists');

        return this.prisma.brewery.update({
            where: { id },
            data: {
                name: dto.name,
                slug: brewerySlug,
            },
        });
    }

    async create(dto: BreweryDto) {
        const brewerySlug = slug(dto.name);

        if (await this.isSlugUsed(brewerySlug))
            throw new BadRequestException('Brewery with this name already exists');

        return this.prisma.brewery.create({
            data: {
                name: dto.name,
                description: dto.description,
                slug: brewerySlug,
            },
        });
    }

    async delete(id: number) {
        //Check if brewery exists
        await this.byId(id);

        return await this.prisma.brewery.delete({
            where: {
                id,
            },
        });
    }

    async isSlugUsed(slug: string, id?: number) {
        const existedBrewery = await this.prisma.brewery.findUnique({
            where: {
                slug,
                NOT: {
                    id,
                },
            },
        });

        return !!existedBrewery;
    }
}
