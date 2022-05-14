import { BadRequestException, Injectable } from '@nestjs/common';
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
    const payload = this.authService.getUserPayload(request);
    const userId = payload.sub;
    const twoFactor = payload.twoFactor;
    code += '';
    const { isValid, data } = await this.twoFactorService.validate(
      userId,
      code,
      authType,
    );
    if (!isValid) throw new BadRequestException(data);

    const newPayload = {
      sub: userId,
      twoFactor: twoFactor,
      twoFactorAuth: isValid,
    };
    const token = { access_token: this.jwtService.sign(newPayload) };
    return token;
  }
}
