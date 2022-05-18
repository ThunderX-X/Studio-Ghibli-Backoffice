import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { AuthCodeTypes } from 'src/multi-factor-auth/enums/auth-codes.enum';

export class TwoFactorLogin {
  @IsNotEmpty()
  @IsEnum(AuthCodeTypes)
  @ApiProperty({ enum: AuthCodeTypes })
  codeType: AuthCodeTypes;

  @IsNotEmpty()
  @ApiProperty()
  code: string;
}
