import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../services/auth.service';
import { TwoFactorAuthService } from '../../multi-factor-auth/services/two-factor-auth.service';
import config from '../../config';
import { ConfigType } from '@nestjs/config';
import { Payload } from '../models/payload.model';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'Local') {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly twoFactorService: TwoFactorAuthService,
    @Inject(config.KEY)
    private readonly configService: ConfigType<typeof config>,
  ) {
    super();
  }

  async validate(email: string, password: string) {
    //Passport pass 'any' in params, to provent errors call toString for guarantee strings
    email = email.toString();
    password = password.toString();
    const user = await this.authService.validateUserAndPassword(
      email,
      password,
    );
    if (!user) throw new UnauthorizedException('Invalid login');
    const availableAuths = await this.twoFactorService.getAvalilableAuths(
      user.id,
    );
    const twoFactorEnabled =
      this.configService.requiredTwoFactor || availableAuths.length > 0;
    const payload: Payload = {
      sub: user.id,
      twoFactor: twoFactorEnabled,
      twoFactorAuth: false,
    };
    const token = { access_token: this.jwtService.sign(payload) };
    return token;
  }
}
