import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Movie } from './../entities/movie.entity';
import { CreateMovieDto, UpdateMovieDto } from './../dtos/movies.dtos';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie, 'databaseHeroku')
    private movieRepo: Repository<Movie>,
  ) {}

  findAll() {
    return this.movieRepo.find();
  }

  async findOne(id: number) {
    const movie = await this.movieRepo.findOne({ id });
    if (!movie) {
      throw new NotFoundException(`Movie #${id} not found`);
    }
    return movie;
  }

  async create(data: CreateMovieDto) {
    const newMovie = this.movieRepo.create(data);
    const { title, originalTitle, romanisedTitle } = data;
    const existMovie = !!(await this.movieRepo.findOne({
      where: [{ title }, { originalTitle }, { romanisedTitle }],
    }));
    if (existMovie)
      throw new ConflictException(
        'Ya existe una pelicula con uno o varios de los titulos ingresados',
      );
    return this.movieRepo.save(newMovie);
  }

  async update(id: number, changes: UpdateMovieDto) {
    const movie = await this.movieRepo.findOne({ id });
    this.movieRepo.merge(movie, changes);
    return this.movieRepo.save(movie);
  }

  remove(id: number) {
    return this.movieRepo.delete(id);
  }
}
