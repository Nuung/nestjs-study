import { Injectable } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];

    getAll(): Movie[] {
        return this.movies;
    }

    getOne(id: string): Movie {
        return this.movies.find(movie => movie.id === +id); // +가 Stirng to Number casting을 해준다.
    }

    deleteOne(id: string): boolean {
        this.movies.filter(movie => movie.id !== +id);
        return true;
    }
}
