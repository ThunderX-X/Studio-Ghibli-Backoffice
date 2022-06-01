import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Payload } from '../models/payload.model';
import { ConfigType } from '@nestjs/config';
import config from '../../config';

@Injectable()
export class LoguedStrategy extends PassportStrategy(Strategy, 'Logued') {
  constructor(@Inject(config.KEY) configService: ConfigType<typeof config>) {
    super({
      secretOrKey: configService.crypto.key,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
    });
  }

  async validate(payload: Payload) {
    this.validateTwofactor(payload);
    return payload;
  }

  private validateTwofactor(payload: Payload) {
    if (payload.twoFactor && !payload.twoFactorAuth)
      throw new ForbiddenException('Not Two factor logged');
  }
}
