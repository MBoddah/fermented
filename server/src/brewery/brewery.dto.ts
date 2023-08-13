import { IsString, MinLength } from 'class-validator';

export class BreweryDto {
    @IsString()
    @MinLength(1)
    name: string;

    @IsString()
    description: string;
}
