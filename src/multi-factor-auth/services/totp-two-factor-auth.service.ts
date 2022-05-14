import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CryptoService } from '../../common/crypto.service';
import { AuthCodeTypes } from '../enums/auth-codes.enum';
import {
  GenerationStatus,
  TwoFactorAuthentication,
  ValidationStatus,
} from '../interfaces/TwoFactorAuthentication';
import { AuthCodesService } from './auth-codes.service';
import * as base32 from 'hi-base32';
import config from '../../config';
import { ConfigType } from '@nestjs/config';
import * as hotp from 'hotp';
import { UserAuthsService } from './user-auths.service';

@Injectable()
export class TotpTwoFactorAuthService implements TwoFactorAuthentication {
  constructor(
    @Inject(config.KEY)
    private readonly configService: ConfigType<typeof config>,
    private readonly authCodesService: AuthCodesService,
    private readonly userAuths: UserAuthsService,
  ) {}

  async generate(
    userId: number,
    generateUri = false,
  ): Promise<GenerationStatus> {
    try {
      await this.validateEnabled(userId);
      let key = await this.getKey(userId);
      if (!key) {
        key = await this.generateKey(userId);
        generateUri = true;
      }
      const toptUri = generateUri ? this.generateTotpURI(key) : null;
      return { generated: true, data: toptUri };
    } catch (error) {
      return { generated: false, data: error.message };
    }
  }

  async validate(userId: number, code: string): Promise<ValidationStatus> {
    try {
      await this.validateEnabled(userId);
      const key = await this.getKey(userId);
      const actualCounter = this.getActualCounter();
      const actualCode = hotp(key, actualCounter);
      return { isValid: this.isValid(code, actualCode), data: null };
    } catch (error) {
      return { isValid: false, data: error.message };
    }
  }

  private isValid(code, actualCode) {
    if (actualCode != code) throw new BadRequestException('Invalid code');
    return true;
  }

  private async validateEnabled(userId: number) {
    const enabled = await this.isEnabled(userId);
    if (!enabled) throw new Error('The TOTP 2FA is not enabled');
  }

  async isEnabled(userId: number): Promise<boolean> {
    const enabledAuthsFound = await this.userAuths.getByTypeAndUser(
      userId,
      AuthCodeTypes.TOTP,
    );
    return enabledAuthsFound.length > 0;
  }

  private getActualCounter(delaySeconds = 1) {
    const ACTUAL_UNIX = Math.floor(Date.now() / 1000) - delaySeconds;
    const CODE_SECONDS_DURATION = 30;
    return Math.floor(ACTUAL_UNIX / CODE_SECONDS_DURATION);
  }

  private generateTotpURI(secret: string) {
    const appName = this.configService.appName;
    const base32Secret = this.convertToBase32(secret);
    return encodeURI(
      `otpauth://totp/${appName}?secret=${base32Secret}&issuer=${appName}`,
    );
  }

  private convertToBase32(value: string) {
    return base32.encode(value);
  }

  private async generateKey(userId: number) {
    const key = CryptoService.generateRandomString(32);
    const { encryptedValue, initializationVector } = CryptoService.encrypt(key);
    await this.authCodesService.create({
      code: `${encryptedValue}#${initializationVector}`,
      codeType: AuthCodeTypes.TOTP,
      userId,
    });
    return key;
  }

  private async getKey(userId: number) {
    const userCode = await this.authCodesService.findOneCode(
      AuthCodeTypes.TOTP,
      userId,
    );
    let key;
    if (userCode) {
      const splitedValues = userCode.code.split('#');
      const cypherInfo = {
        encryptedKey: splitedValues[0],
        initializationVector: splitedValues[1],
      };
      key = CryptoService.decrypt(
        cypherInfo.encryptedKey,
        cypherInfo.initializationVector,
      );
    }

    return key;
  }
}
