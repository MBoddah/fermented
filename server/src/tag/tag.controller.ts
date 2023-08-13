import { Controller } from '@nestjs/common';
import { TagService } from './tag.service';
import { Body, Delete, Get, HttpCode, Param, Post, Put, UsePipes } from '@nestjs/common/decorators';
import { ValidationPipe } from '@nestjs/common/pipes';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { TagDto } from './tag.dto';

@Controller('tag')
export class TagController {
    constructor(private readonly tagService: TagService) {}

    //Get all tags
    @Get()
    async getAll() {
        return this.tagService.getAll();
    }

    //Get tag by slug
    @Get('slug/:slug')
    async getBySlug(@Param('slug') slug: string) {
        return this.tagService.bySlug(slug);
    }

    //Get tag by id
    @Get(':id')
    @Auth()
    async getById(@Param('id') id: string) {
        return this.tagService.byId(+id);
    }

    //Create tag
    @HttpCode(200)
    @UsePipes(new ValidationPipe())
    @Auth()
    @Post()
    async create(@Body() dto: TagDto) {
        return this.tagService.create(dto);
    }

    //Update tag
    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Auth()
    @Put(':id')
    async update(@Param('id') id: string, @Body() dto: TagDto) {
        return this.tagService.update(+id, dto);
    }

    //Delete tag
    @HttpCode(200)
    @Auth()
    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.tagService.delete(+id);
    }
}
