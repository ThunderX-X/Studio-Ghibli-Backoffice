import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsPositive,
  IsUrl,
  Length,
  MaxLength,
} from 'class-validator';

import { PartialType, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class CreateUser {
  @IsNotEmpty()
  @Length(2, 50)
  @ApiProperty()
  firstName: string;

  @IsNotEmpty()
  @Length(2, 50)
  @ApiProperty()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(75)
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  active: boolean;

  @IsNotEmpty()
  @IsUrl()
  @ApiProperty()
  profilePicture: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @Exclude()
  facebookId: string;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  roleId: number;
}

export class UpdateUser extends PartialType(CreateUser) {}
