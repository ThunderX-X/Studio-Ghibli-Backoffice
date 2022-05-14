import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthCodeTypes } from '../../multi-factor-auth/enums/auth-codes.enum';
import { TwoFactorAuthService } from '../../multi-factor-auth/services/two-factor-auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalGuard } from '../guards/local.guard';
import { AuthService } from '../services/auth.service';
import { TwoFactorGuard } from '../guards/two-factor.guard';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly twoFactorAuthService: TwoFactorAuthService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(LocalGuard)
  @Get('generate/:codeType')
  generate(@Param('codeType') codeType: AuthCodeTypes, request: Request) {
    const userId = this.authService.getUserId(request);
    return this.twoFactorAuthService.generate(userId, AuthCodeTypes.TOTP);
  }

  @UseGuards(LocalGuard)
  @Get('validate/:codeType/:code')
  validate(
    @Param('code') code: string,
    @Param('codeType') codeType: AuthCodeTypes,
    request: Request,
  ) {
    const userId = this.authService.getUserId(request);
    return this.twoFactorAuthService.validate(userId, code, codeType);
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

  @UseGuards(TwoFactorGuard)
  @Get('prueba')
  prueba() {
    return 'hey!';
  }
}
