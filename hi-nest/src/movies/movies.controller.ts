import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { CreateMovieDto } from './DTO/create-movie.dto';
import { UpdateMovieDto } from './DTO/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {

    constructor(private readonly movieService: MoviesService) {}

    @Get()
    getAll(): Movie[] {
        return this.movieService.getAll();
    }

    @Get("search")
    search(@Query('year') searchingYear: string) {
        return `We are searching for a movie made after: ${searchingYear}`
    }

    @Get(":id")
    getOne(@Param("id") movieId: number): Movie {
        console.log(typeof movieId);
        return this.movieService.getOne(movieId);
    }

    @Post()
    create(@Body() movieData: CreateMovieDto) {
        movieData
        return this.movieService.create(movieData);
    }

    @Delete(":id")
    remove(@Param("id") movieId: number) {
        return this.movieService.deleteOne(movieId);
    }

    @Patch(":id")
    path(@Param("id") movieId: number, @Body() updateData: UpdateMovieDto) {
        return this.movieService.update(movieId, updateData);
    }
}
