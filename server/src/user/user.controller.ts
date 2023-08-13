import {
    Controller,
    Get,
    HttpCode,
    Put,
    UsePipes,
    ValidationPipe,
    Body,
    Patch,
    Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { UserDto } from './user.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    //Get user profile
    @Get('profile')
    @Auth()
    async getProfile(@CurrentUser('id') id: number) {
        return this.userService.byId(id);
    }

    //Update user profile
    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Auth()
    @Put('profile')
    async register(@CurrentUser('id') id: number, @Body() dto: UserDto) {
        return this.userService.updateProfile(id, dto);
    }

    //Toggle drink favorite
    @HttpCode(200)
    @Auth()
    @Patch('profile/favorites/:drinkId')
    async toggleFavorite(@CurrentUser('id') id: number, @Param('drinkId') drinkId: string) {
        return this.userService.toggleFavorite(id, +drinkId);
    }
}
