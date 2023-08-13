import { Module } from '@nestjs/common';
import { BreweryService } from './brewery.service';
import { BreweryController } from './brewery.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
    controllers: [BreweryController],
    providers: [BreweryService, PrismaService],
    exports: [BreweryService],
})
export class BreweryModule {}
