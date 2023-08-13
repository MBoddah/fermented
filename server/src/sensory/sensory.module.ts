import { Module } from '@nestjs/common';
import { SensoryService } from './sensory.service';
import { SensoryController } from './sensory.controller';
import { PrismaService } from 'src/prisma.service';
import { DrinkService } from 'src/drink/drink.service';
import { BreweryService } from 'src/brewery/brewery.service';

@Module({
    controllers: [SensoryController],
    providers: [SensoryService, PrismaService, DrinkService, BreweryService],
})
export class SensoryModule {}
