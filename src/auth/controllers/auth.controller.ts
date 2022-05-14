import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthCodeTypes } from 'src/multi-factor-auth/enums/auth-codes.enum';
import { TwoFactorAuthService } from 'src/multi-factor-auth/services/two-factor-auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalGuard } from '../guards/local.guard';
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

  @UseGuards(AuthGuard('Local'))
  @Post('login')
  login(@Req() req: Request) {
    return req.user;
  }

  @UseGuards(LocalGuard, AuthGuard('TwoFactor'))
  @Post('twoFactorLogin')
  twoFactorLogin(@Req() req: Request) {
    return req.user;
  }
}
