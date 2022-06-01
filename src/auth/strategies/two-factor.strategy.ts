import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';
import { TwoFactorAuthService } from '../../multi-factor-auth/services/two-factor-auth.service';
import { Request } from 'express';
import { Payload } from '../models/payload.model';
import { ConfigType } from '@nestjs/config';
import config from '../../config';
import { TwoFactorLogin } from '../models/two-factor-login.model';
import { AuthCodeTypes } from 'src/multi-factor-auth/enums/auth-codes.enum';
import { ModulePermissionPayload } from '../models/module-payload.model';
import { PermissionsService } from '../services/permissions.service';
@Injectable()
export class TwoFactorStrategy extends PassportStrategy(Strategy, 'TwoFactor') {
  constructor(
    @Inject(config.KEY) configService: ConfigType<typeof config>,
    private readonly permissionsService: PermissionsService,
    private readonly jwtService: JwtService,
    private readonly twoFactorService: TwoFactorAuthService,
  ) {
    super({
      passReqToCallback: true,
      secretOrKey: configService.crypto.key,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
    });
  }

  async validate(request: Request, payload: Payload) {
    const userId = payload.sub;
    const twoFactor = payload.twoFactor;
    const loginData: TwoFactorLogin = { ...request.body };
    const codeTypeId = AuthCodeTypes[loginData.codeType];
    if (!codeTypeId) throw new BadRequestException('Invalid auth code type');
    const { isValid, data } = await this.twoFactorService.validate(
      userId,
      loginData.code,
      codeTypeId as any,
    );
    if (!isValid) throw new BadRequestException(data);
    const permissions: ModulePermissionPayload[] =
      await this.permissionsService.getPermissionsAsPayloadType(userId);
    const newPayload: Payload = {
      sub: userId,
      twoFactor: twoFactor,
      twoFactorAuth: isValid,
      permissions,
    };
    const token = { access_token: this.jwtService.sign(newPayload) };
    return token;
  }
}
