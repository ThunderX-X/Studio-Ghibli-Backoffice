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
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

import { MoviesService } from './../services/movies.service';
import { CreateMovieDto, UpdateMovieDto } from './../dtos/movies.dtos';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { PermissionTypes } from 'src/auth/enums/permissionsType.enum';
import { AuthGuard } from '@nestjs/passport';
import { RequiredPermissions } from 'src/auth/decorators/required-permissions.decorator';
import { ModulesEnum } from 'src/auth/enums/modules.enum';
import { AplicationModule } from 'src/auth/decorators/app-module.decorator';

@ApiTags('movies')
@Controller('movies')
@AplicationModule(ModulesEnum.MOVIES)
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Get()
  @UseGuards(AuthGuard('Logued'), RolesGuard)
  @RequiredPermissions(PermissionTypes.READ)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List of movies' })
  getMovies() {
    return this.moviesService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('Logued'), RolesGuard)
  @RequiredPermissions(PermissionTypes.READ)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Consult one movie for ID' })
  @HttpCode(HttpStatus.ACCEPTED)
  getMovie(@Param('id', ParseIntPipe) id: number) {
    return this.moviesService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard('Logued'), RolesGuard)
  @RequiredPermissions(PermissionTypes.CREATE)
  @ApiBearerAuth()
  create(@Body() payload: CreateMovieDto) {
    return this.moviesService.create(payload);
  }

  @Put(':id')
  @UseGuards(AuthGuard('Logued'), RolesGuard)
  @RequiredPermissions(PermissionTypes.UPDATE)
  @ApiBearerAuth()
  update(@Param('id') id: number, @Body() payload: UpdateMovieDto) {
    return this.moviesService.update(id, payload);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('Logued'), RolesGuard)
  @RequiredPermissions(PermissionTypes.DELETE)
  @ApiBearerAuth()
  delete(@Param('id') id: number) {
    return this.moviesService.remove(id);
  }
}
