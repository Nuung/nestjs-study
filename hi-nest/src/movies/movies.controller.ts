import { Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';

@Controller('movies')
export class MoviesController {

    @Get()
    getAll() {
        return "This will return all movies";
    }

    @Get("/:id")
    getOne(@Param("id") id: string) {
        return `This will return one movie with the id: ${id}`;
    }

    @Post()
    create(@Body() movieData) {
        console.log(movieData);
        return movieData;
    }

    @Delete("/:id")
    remove(@Param("id") movieId: string) {
        return `This will delete a movie with the id: ${movieId}`
    }

    @Patch("/:id")
    path(@Param("id") movieId: string) {
        return {
            updateMovie: movieId,
            ...updateData,
        };
    }
}
