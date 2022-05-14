import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthTypeUser } from '../../database/entities/auth-types-user.entity';
import { AuthCodeTypes } from '../enums/auth-codes.enum';
import { TwoFactorAuthentication } from '../interfaces/TwoFactorAuthentication';
import { EmailTwoFactorAuthenticationService } from './email-two-factor-authentication.service';
import { TotpTwoFactorAuthService } from './totp-two-factor-auth.service';

const mapCodeToClass = {};
mapCodeToClass[AuthCodeTypes.EMAIL] = EmailTwoFactorAuthenticationService;
mapCodeToClass[AuthCodeTypes.TOTP] = TotpTwoFactorAuthService;

@Injectable()
export class TwoFactorAuthService {
  constructor(
    @InjectRepository(AuthTypeUser)
    private readonly authTypeUserRepo: Repository<AuthTypeUser>,
    private readonly moduleRef: ModuleRef,
  ) {}

  getAvalilableAuths(userId: number) {
    return this.authTypeUserRepo.find({
      relations: ['authTypeId'],
      where: { userId },
    });
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
