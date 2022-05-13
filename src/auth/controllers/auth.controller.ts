import { Controller, Get, Param } from '@nestjs/common';
import { AuthCodeTypes } from 'src/multi-factor-auth/enums/auth-codes.enum';
import { TwoFactorAuthService } from 'src/multi-factor-auth/services/two-factor-auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly twoFactorAuthService: TwoFactorAuthService) {}
  @Get('generate')
  generate() {
    return this.twoFactorAuthService.generate(1, AuthCodeTypes.TOTP);
  }

  @Get('validate/:code')
  validate(@Param('code') code: string) {
    return this.twoFactorAuthService.validate(1, code, AuthCodeTypes.TOTP);
  }
}
