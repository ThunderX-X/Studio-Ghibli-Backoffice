import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../services/auth.service';
import { TwoFactorAuthService } from '../../multi-factor-auth/services/two-factor-auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'Local') {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly twoFactorService: TwoFactorAuthService,
  ) {
    super();
  }

  async validate(email: string, password: string) {
    const user = await this.authService.validateUserAndPassword(
      email,
      password,
    );
    if (!user) throw new UnauthorizedException('Invalid login');
    const availableAuths = await this.twoFactorService.getAvalilableAuths(
      user.id,
    );
    const twoFactorEnabled = availableAuths.length > 0;
    const payload = {
      sub: user.id,
      twoFactor: twoFactorEnabled,
      twoFactorAuth: false,
    };
    const token = { access_token: this.jwtService.sign(payload) };
    return token;
  }
}
