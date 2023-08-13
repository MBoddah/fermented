import { IsString, MinLength } from 'class-validator';

export class TagDto {
    @IsString()
    @MinLength(1)
    name: string;
}
