import { Module } from '@nestjs/common';
import { SensoryService } from './sensory.service';
import { SensoryController } from './sensory.controller';
import { PrismaService } from 'src/prisma.service';
import { DrinkModule } from 'src/drink/drink.module';
import { BreweryModule } from 'src/brewery/brewery.module';

@Module({
    imports: [DrinkModule, BreweryModule],
    controllers: [SensoryController],
    providers: [SensoryService, PrismaService],
    exports: [SensoryService],
})
export class SensoryModule {}
