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
import { Auth } from 'src/auth/decorators/auth.decorator';
import { BreweryService } from './brewery.service';
import { BreweryDto } from './brewery.dto';

@Controller('brewery')
export class BreweryController {
    constructor(private readonly breweryService: BreweryService) {}

    //Get all breweries
    @Get()
    async getAll() {
        return this.breweryService.getAll();
    }

    //Get brewery by slug
    @Get('slug/:slug')
    async getBySlug(@Param('slug') slug: string) {
        return this.breweryService.bySlug(slug);
    }

    //Get brewery by id
    @Get(':id')
    @Auth()
    async getById(@Param('id') id: string) {
        return this.breweryService.byId(+id);
    }

    //Create brewery
    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Auth()
    @Post()
    async create(@Body() dto: BreweryDto) {
        return this.breweryService.create(dto);
    }

    //Update brewery
    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Auth()
    @Put(':id')
    async update(@Param('id') id: string, @Body() dto: BreweryDto) {
        return this.breweryService.update(+id, dto);
    }

    //Delete brewery
    @HttpCode(200)
    @Auth()
    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.breweryService.delete(+id);
    }
}
