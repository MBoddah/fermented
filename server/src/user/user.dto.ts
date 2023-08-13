import { IsOptional, IsString, IsEmail, MinLength } from 'class-validator';

export class UserDto {
    @IsEmail()
    email: string;

    @MinLength(6, {
        message: 'Password must be at least 6 characters long',
    })
    @IsString()
    password?: string;

    @IsString()
    @MinLength(1)
    firstName: string;

    @IsString()
    @MinLength(1)
    lastName: string;

    @IsOptional()
    @IsString()
    avatarPath: string;
}
