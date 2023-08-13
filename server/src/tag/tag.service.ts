import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { tagObject } from './tag.object';
import { TagDto } from './tag.dto';
import * as slug from 'slug';

@Injectable()
export class TagService {
    constructor(private prisma: PrismaService) {}

    //Get tag by id
    async byId(id: number) {
        const tag = await this.prisma.tag.findUnique({
            where: {
                id,
            },
            select: tagObject,
        });

        if (!tag) throw new NotFoundException('Tag not found');

        return tag;
    }

    //Get tag by slug
    async bySlug(slug: string) {
        const tag = await this.prisma.tag.findUnique({
            where: {
                slug,
            },
            select: tagObject,
        });

        if (!tag) throw new NotFoundException('Tag not found');

        return tag;
    }

    //Get all categories
    async getAll() {
        return this.prisma.tag.findMany({
            select: tagObject,
        });
    }

    //Update tag
    async update(id: number, dto: TagDto) {
        //Check if tag exists
        await this.byId(id);

        const tagSlug = slug(dto.name);

        if (await this.isSlugUsed(tagSlug, id))
            throw new BadRequestException('Tag with this name already exists');

        return this.prisma.tag.update({
            where: { id },
            data: {
                name: dto.name,
                slug: tagSlug,
            },
        });
    }

    async create(dto: TagDto) {
        const tagSlug = slug(dto.name);

        if (await this.isSlugUsed(tagSlug))
            throw new BadRequestException('Tag with this name already exists');

        return this.prisma.tag.create({
            data: {
                name: dto.name,
                slug: tagSlug,
            },
        });
    }

    async delete(id: number) {
        //Check if tag exists
        await this.byId(id);

        return await this.prisma.tag.delete({
            where: {
                id,
            },
        });
    }

    async isSlugUsed(slug: string, id?: number) {
        const existedTag = await this.prisma.tag.findUnique({
            where: {
                slug,
                NOT: {
                    id,
                },
            },
        });

        return !!existedTag;
    }
}
