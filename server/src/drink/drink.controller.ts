import {
    Body,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    Put,
    UsePipes,
    Controller,
} from '@nestjs/common/decorators';
import { ValidationPipe } from '@nestjs/common/pipes';
import { DrinkService } from './drink.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { DrinkDto } from './drink.dto';

@Controller('drink')
export class DrinkController {
    constructor(private readonly drinkService: DrinkService) {}

    //Get drink by id
    @Get(':id')
    @Auth()
    async getById(@Param('id') id: string) {
        return this.drinkService.byId(+id);
    }

    //Get drink by slug
    @Get('by-slug/:slug')
    async getBySlug(@Param('slug') slug: string) {
        return this.drinkService.bySlug(slug);
    }

    //Get drink by tag
    @Get('by-tag/:tag')
    async getByTag(@Param('tag') tag: string) {
        return this.drinkService.byTag(tag);
    }

    //Get drink by brewery
    @Get('by-brewery/:brewery')
    async getByBrewery(@Param('brewery') brewery: string) {
        return this.drinkService.byBrewery(+brewery);
    }

    //Get similar
    @Get('similar/:id')
    async getSimilar(@Param('id') id: string) {
        return this.drinkService.getSimilar(+id);
    }

    //Create drink
    @UsePipes(new ValidationPipe())
    @Post()
    @HttpCode(200)
    @Auth()
    async create(@Body() dto: DrinkDto) {
        return this.drinkService.create(2, dto);
    }

    //Update drink
    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Auth()
    @Put(':id')
    async update(@Param('id') id: string, @Body() dto: DrinkDto) {
        return this.drinkService.update(+id, dto);
    }

    //Delete drink
    @HttpCode(200)
    @Auth()
    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.drinkService.delete(+id);
    }
}
