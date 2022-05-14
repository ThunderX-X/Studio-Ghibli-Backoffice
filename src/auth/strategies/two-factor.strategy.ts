import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../services/auth.service';
import { TwoFactorAuthService } from '../../multi-factor-auth/services/two-factor-auth.service';
import { AuthCodeTypes } from 'src/multi-factor-auth/enums/auth-codes.enum';
import { UsersService } from 'src/users/services/users.service';
import { Request } from 'express';

@Injectable()
export class TwoFactorStrategy extends PassportStrategy(Strategy, 'TwoFactor') {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly twoFactorService: TwoFactorAuthService,
    private readonly usersService: UsersService,
  ) {
    super({ passReqToCallback: true });
  }

  async validate(request: Request, authType: AuthCodeTypes, code: string) {
    const access_token = request.headers.authorization;
    const payload: any = this.jwtService.decode(access_token);
    const userId = payload.sub;
    const twoFactor = payload.twoFactor;
    const isValid = await this.twoFactorService.validate(
      userId,
      code,
      authType,
    );
    if (!isValid) throw new UnauthorizedException('Invalid login');

    const newPayload = {
      sub: userId,
      twoFactor: twoFactor,
      twoFactorAuth: isValid,
    };
    const token = { access_token: this.jwtService.sign(newPayload) };
    return token;
  }
}
