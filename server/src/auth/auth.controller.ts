import { Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    //Registration
    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post('register')
    async register(@Body() dto: AuthDto) {
        return this.authService.register(dto);
    }

    //Authentication
    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post('login')
    async login(@Body() dto: AuthDto) {
        return this.authService.login(dto);
    }

    //Get tokens
    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post('login/access-token')
    async getNewTokens(@Body() dto: RefreshTokenDto) {
        return this.authService.getNewTokens(dto.refreshToken);
    }
}
