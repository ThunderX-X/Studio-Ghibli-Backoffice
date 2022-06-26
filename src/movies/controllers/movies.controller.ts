import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { MoviesService } from './../services/movies.service';
import { CreateMovieDto, UpdateMovieDto } from './../dtos/movies.dtos';

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Get()
  @ApiOperation({ summary: 'List of movies' })
  getMovies() {
    return this.moviesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Consult one movie for ID' })
  @HttpCode(HttpStatus.ACCEPTED)
  getMovie(@Param('id', ParseIntPipe) id: number) {
    return this.moviesService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateMovieDto) {
    return this.moviesService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateMovieDto) {
    return this.moviesService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.moviesService.remove(id);
  }
}
