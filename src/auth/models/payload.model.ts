import { IsBoolean, IsNotEmpty, IsPositive } from 'class-validator';

export class Payload {
  @IsNotEmpty()
  @IsPositive()
  sub: number;

  @IsNotEmpty()
  @IsBoolean()
  twoFactor: boolean;

  @IsNotEmpty()
  @IsBoolean()
  twoFactorAuth: boolean;
}
