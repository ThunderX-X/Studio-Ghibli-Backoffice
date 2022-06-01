import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty()
  @MinLength(4)
  @IsString()
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  active: boolean;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ApiProperty({ type: [Number] })
  permissions: number[];
}

export class UpdateRoleDto extends PartialType(CreateRoleDto) {}
