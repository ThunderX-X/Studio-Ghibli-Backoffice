/* eslint-disable prettier/prettier */
import {
  IsString,
  //IsNumber,
  IsUrl,
  IsEmail,
  //IsDate,
  IsNotEmpty,
} from 'class-validator';

//import { PartialType } from '@nestjs/mapped-types';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'User first name' })
  readonly first_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'User last name' })
  readonly last_name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: 'Email' })
  readonly email: string;

  @IsString()
  @ApiProperty({ description: 'Status' })
  readonly active: string;

  @IsUrl()
  @ApiProperty({ description: 'Image user' })
  readonly profile_picture: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Password' })
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Rol' })
  readonly rol_id: string;

  //@IsDate()
  //readonly created_at: string;

  //@IsDate()
  //readonly updated_at: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
