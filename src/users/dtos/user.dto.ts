import {
  IsString,
  IsUrl,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  Length,
  MaxLength,
  IsBoolean,
  IsPositive,
} from 'class-validator';

import { PartialType, ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class CreateUserDto {
  @IsNotEmpty()
  @Length(2, 50)
  @ApiProperty({ description: 'User first name' })
  firstName: string;

  @IsNotEmpty()
  @Length(2, 50)
  @ApiProperty({ description: 'User last name' })
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(75)
  @ApiProperty({ description: 'Email' })
  email: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({ description: 'Status' })
  active: boolean;

  @IsNotEmpty()
  @IsUrl()
  @ApiProperty({ description: 'Image user' })
  profilePicture: string;

  @Exclude()
  @ApiHideProperty()
  facebookId: string;

  @Exclude()
  @ApiHideProperty()
  twitterId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Password' })
  password: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ description: 'Role Id' })
  roleId: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
