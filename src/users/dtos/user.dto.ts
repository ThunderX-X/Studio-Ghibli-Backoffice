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
  ArrayNotEmpty,
  ArrayMinSize,
  IsEnum,
  Validate,
  MinLength,
} from 'class-validator';

import { PartialType, ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { AuthCodeTypes } from 'src/multi-factor-auth/enums/auth-codes.enum';
import {
  PasswordValidation,
  PasswordValidationRequirement,
} from 'class-validator-password-check';
import { AuthTypeUser } from 'src/database/entities/auth-types-user.entity';

const passwordRequirements: PasswordValidationRequirement = {
  mustContainLowerLetter: true,
  mustContainNumber: true,
  mustContainSpecialCharacter: true,
  mustContainUpperLetter: true,
};

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
  @MinLength(8)
  @MaxLength(20)
  @Validate(PasswordValidation, [passwordRequirements])
  password: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ description: 'Role Id' })
  roleId: number;

  @IsNotEmpty()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @IsEnum(AuthCodeTypes, { each: true })
  @IsString({ each: true })
  @ApiProperty({
    description: 'List of two factor methods enabled for the user',
    type: Array(AuthCodeTypes),
    enum: AuthCodeTypes,
  })
  twoFactorMethods: AuthCodeTypes[];
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
