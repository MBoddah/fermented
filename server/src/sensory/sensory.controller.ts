import { Controller } from '@nestjs/common';
import { Body, Delete, Get, HttpCode, Param, Post, Put, UsePipes } from '@nestjs/common/decorators';
import { ValidationPipe } from '@nestjs/common/pipes';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { SensoryService } from './sensory.service';
import { SensoryDto } from './sensory.dto';
import { CurrentUser } from 'src/auth/decorators/user.decorator';

@Controller('sensory')
export class SensoryController {
    constructor(private readonly sensoryService: SensoryService) {}

    //Get sensory by id
    @Get(':id')
    async getById(@Param('id') id: string) {
        return this.sensoryService.byId(+id);
    }

    //Create sensory
    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Auth()
    @Post('leave/:drinkId')
    async leaveSensory(
        @CurrentUser('id') id: number,
        @Param('drinkId') drinkId: string,
        @Body() dto: SensoryDto,
    ) {
        return this.sensoryService.create(id, +drinkId, dto);
    }

    //Update sensory
    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Auth()
    @Put(':id')
    async update(@Param('id') id: string, @Body() dto: SensoryDto) {
        return this.sensoryService.update(+id, dto);
    }

    //Delete sensory
    @HttpCode(200)
    @Auth()
    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.sensoryService.delete(+id);
    }
}
