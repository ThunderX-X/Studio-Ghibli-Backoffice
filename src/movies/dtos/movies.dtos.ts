import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly originalTitle: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly romanisedTitle: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly releaseYear: number;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty()
  readonly wikiLink: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly music: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly duration: number;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty()
  readonly cover: string;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty()
  readonly banner: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly trailer: string;
}

export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
