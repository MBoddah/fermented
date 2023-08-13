import { Module } from '@nestjs/common';
import { DrinkService } from './drink.service';
import { DrinkController } from './drink.controller';
import { PrismaService } from 'src/prisma.service';
import { BreweryService } from 'src/brewery/brewery.service';

@Module({
    controllers: [DrinkController],
    providers: [DrinkService, PrismaService, BreweryService],
    exports: [DrinkService],
})
export class DrinkModule {}
