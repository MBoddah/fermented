import { IsNumber, IsString, Min, Max, IsArray } from 'class-validator';

export class SensoryDto {
    @IsString()
    text: string;

    @IsString({ each: true })
    @IsArray()
    images: string[];

    @IsNumber()
    @Min(1)
    @Max(5)
    rating: number;
}
