import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class StatisticService {
    constructor(private prisma: PrismaService, private userService: UserService) {}

    async getMain(userId: number) {
        const user = await this.userService.byId(userId, {
            sensories: true,
            favorites: true,
        });

        return [
            {
                name: 'Sensories',
                value: user.sensories.length,
            },
            {
                name: 'Favorites',
                value: user.favorites.length,
            },
        ];
    }
}
