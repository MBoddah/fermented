import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthDto } from './dto/auth.dto';
import { faker } from '@faker-js/faker/locale/af_ZA';
import { hash, verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService) {}

    //Registration
    async register(dto: AuthDto) {
        //Check if user already exists (email occupied)
        const existedUser = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });

        if (existedUser) throw new BadRequestException('User already exists');

        //Create new user
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                avatarPath: faker.image.avatar(),
                password: await hash(dto.password),
            },
        });

        //Get user tokens
        const tokens = await this.issueTokens(+user.id);

        //Return new user with tokens
        return {
            user: this.returnUserFields(user),
            ...tokens,
        };
    }

    //Authentication
    async login(dto: AuthDto) {
        const user = await this.validateUser(dto);
        const tokens = await this.issueTokens(+user.id);

        //Return user with tokens
        return {
            user: this.returnUserFields(user),
            ...tokens,
        };
    }

    //Get new tokens
    async getNewTokens(refreshToken: string) {
        //Check if refresh token valid
        const result = await this.jwt.verifyAsync(refreshToken);

        if (!result) throw new UnauthorizedException('Invalid refresh token');

        //Get new tokens
        const user = await this.prisma.user.findUnique({ where: { id: result.id } });
        const tokens = await this.issueTokens(+user.id);

        return {
            user: this.returnUserFields(user),
            ...tokens,
        };
    }

    private async issueTokens(userId: number) {
        const data = { id: userId };

        const accessToken = this.jwt.sign(data, {
            expiresIn: '1h',
        });

        const refreshToken = this.jwt.sign(data, {
            expiresIn: '7d',
        });

        return { accessToken, refreshToken };
    }

    private returnUserFields(user: User) {
        return {
            id: user.id,
            email: user.email,
        };
    }

    private async validateUser(dto: AuthDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });

        if (!user) throw new NotFoundException('User not found');

        const isValid = await verify(user.password, dto.password);

        if (!isValid) throw new UnauthorizedException('Invalid password');

        return user;
    }
}
