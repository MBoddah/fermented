import { BadRequestException, NotFoundException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { userObject } from './user.object';
import { Prisma } from '@prisma/client';
import { UserDto } from './user.dto';
import { hash } from 'argon2';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    //Get user by id
    async byId(id: number, selectObject: Prisma.UserSelect = {}) {
        const user = await this.prisma.user.findUnique({
            where: {
                id,
            },
            select: {
                ...userObject,
                favorites: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        images: true,
                        slug: true,
                    },
                },
                ...selectObject,
            },
        });

        if (!user) throw new NotFoundException('User not found');

        return user;
    }

    //Update user profile
    async updateProfile(id: number, dto: UserDto) {
        //Check if email already in use
        const userByEmail = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });

        //If email used by other user
        if (userByEmail && id !== userByEmail.id)
            throw new BadRequestException('Email already in use');

        //Get user current data
        const user = await this.byId(id);

        return this.prisma.user.update({
            where: { id },
            data: {
                email: dto.email || user.email,
                firstName: dto.firstName || user.firstName,
                lastName: dto.lastName || user.lastName,
                avatarPath: dto.avatarPath || user.avatarPath,
                password: dto.password ? await hash(dto.password) : user.password,
            },
        });
    }

    async toggleFavorite(userId: number, drinkId: number) {
        const user = await this.byId(userId);

        if (!user) throw new NotFoundException('User not found');

        //!!!Check if drink exists!!!

        //Check if drink already favorite
        const isFavorite = user.favorites.some(drink => drink.id === drinkId);

        await this.prisma.user.update({
            where: { id: user.id },
            data: {
                favorites: {
                    [isFavorite ? 'disconnect' : 'connect']: {
                        id: drinkId,
                    },
                },
            },
        });

        return { message: 'success' };
    }
}
