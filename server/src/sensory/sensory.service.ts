import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { sensoryObject } from './sensory.object';
import { SensoryDto } from './sensory.dto';
import { DrinkService } from 'src/drink/drink.service';

@Injectable()
export class SensoryService {
    constructor(private prisma: PrismaService, private drinkService: DrinkService) {}

    async byDrink(id: number) {
        //Check if drink exists
        await this.drinkService.byId(id);

        return await this.prisma.sensory.findMany({
            where: {
                drinkId: id,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    //Get sensory by id
    async byId(id: number) {
        const sensory = await this.prisma.sensory.findUnique({
            where: {
                id,
            },
            select: sensoryObject,
        });

        if (!sensory) throw new NotFoundException('Sensory not found');

        return sensory;
    }

    async create(userId: number, drinkId: number, dto: SensoryDto) {
        //Check if drink exists
        await this.drinkService.byId(drinkId);

        return this.prisma.sensory.create({
            data: {
                ...dto,
                drink: {
                    connect: {
                        id: drinkId,
                    },
                },
                author: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });
    }

    //Update sensory
    async update(id: number, dto: SensoryDto) {
        //Check if sensory exists
        await this.byId(id);

        return this.prisma.sensory.update({
            where: { id },
            data: {
                images: dto.images,
                text: dto.text,
                rating: dto.rating,
            },
        });
    }

    async getAverageByDrinkId(drinkId: number) {
        //Check if drink and sensory exist
        await this.drinkService.byId(drinkId);

        const existedSensory = this.prisma.sensory.findFirst({
            where: {
                drinkId,
            },
        });

        if (!existedSensory) throw new BadRequestException('This drink has no sensories yet');

        return this.prisma.sensory
            .aggregate({
                where: { drinkId },
                _avg: { rating: true },
            })
            .then(data => data._avg);
    }

    async delete(id: number) {
        //Check if sensory exists
        await this.byId(id);

        return await this.prisma.sensory.delete({
            where: {
                id,
            },
        });
    }
}
