import { ArrayMinSize, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class DrinkDto {
    @IsString()
    @MinLength(1)
    name: string;

    @IsString()
    description: string;

    @IsString({ each: true })
    @ArrayMinSize(1)
    images: string[];

    @IsNumber()
    @IsOptional()
    tagId: number;
}
