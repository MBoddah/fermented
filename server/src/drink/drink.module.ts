import { Module } from '@nestjs/common';
import { DrinkService } from './drink.service';
import { DrinkController } from './drink.controller';
import { PrismaService } from 'src/prisma.service';
import { BreweryModule } from 'src/brewery/brewery.module';
import { TagModule } from 'src/tag/tag.module';

@Module({
    imports: [BreweryModule, TagModule],
    controllers: [DrinkController],
    providers: [DrinkService, PrismaService],
    exports: [DrinkService],
})
export class DrinkModule {}
