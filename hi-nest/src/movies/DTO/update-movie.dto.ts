/*
import { IsNumber, IsString } from 'class-validator';

export class UpdateMovieDto {
    @IsString()
    readonly title?: string;
    
    @IsNumber()
    readonly year?: number;

    @IsString({ each: true })
    readonly genres?: string[];
}
*/

import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {

}