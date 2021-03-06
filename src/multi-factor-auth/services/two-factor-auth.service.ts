import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthType } from 'src/database/entities/auth-types.entity';
import { Repository } from 'typeorm';
import { AuthCodeTypes } from '../enums/auth-codes.enum';
import { TwoFactorAuthentication } from '../interfaces/TwoFactorAuthentication';
import { EmailTwoFactorAuthenticationService } from './email-two-factor-authentication.service';
import { TotpTwoFactorAuthService } from './totp-two-factor-auth.service';
import { UserAuthsService } from './user-auths.service';

const mapCodeToClass = {};
mapCodeToClass[AuthCodeTypes.EMAIL] = EmailTwoFactorAuthenticationService;
mapCodeToClass[AuthCodeTypes.TOTP] = TotpTwoFactorAuthService;

@Injectable()
export class TwoFactorAuthService {
  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly userAuthsService: UserAuthsService,
    @InjectRepository(AuthType)
    private readonly authTypesRepository: Repository<AuthType>,
  ) {}

  getAvalilableAuthsUser(userId: number) {
    return this.userAuthsService.getAllByUser(userId);
  }

  getAvalilableAuths() {
    return this.authTypesRepository.find();
  }

  async generate(userId: number, authType: AuthCodeTypes) {
    const twoFactorService: TwoFactorAuthentication =
      await this.moduleRef.create(mapCodeToClass[authType]);
    return twoFactorService.generate(userId);
  }

  async validate(userId: number, code: string, authType: AuthCodeTypes) {
    const twoFactorService: TwoFactorAuthentication =
      await this.moduleRef.create(mapCodeToClass[authType]);
    return twoFactorService.validate(userId, code);
  }
}
