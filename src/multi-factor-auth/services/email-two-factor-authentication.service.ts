import { BadRequestException, Injectable } from '@nestjs/common';
import { MultiFactorAuthCode } from '../../database/entities/multi-factor-auth-codes.entity';
import { AuthCodesService } from './auth-codes.service';
import {
  GenerationStatus,
  ValidationStatus,
  TwoFactorAuthentication,
} from '../interfaces/TwoFactorAuthentication';
import { EmailService } from '../../common/email.service';
import { UsersService } from '../../users/services/users.service';
import { CryptoService } from '../../common/crypto.service';
import { AuthCodeTypes } from '../enums/auth-codes.enum';
import { UserAuthsService } from './user-auths.service';

const LOGIN_CODE_SIZE = 10;

@Injectable()
export class EmailTwoFactorAuthenticationService
  implements TwoFactorAuthentication
{
  constructor(
    private readonly authCodeService: AuthCodesService,
    private readonly emailService: EmailService,
    private readonly userService: UsersService,
    private readonly userAuths: UserAuthsService,
  ) {}

  async validate(userId: number, code: string): Promise<ValidationStatus> {
    try {
      await this.validateEnabled(userId);
      const hashedCode = CryptoService.getHash(code);
      const userCode = await this.getUserCode(userId, hashedCode);
      if (userCode) {
        await this.deleteUserCode(userId, hashedCode);
      }
      return { isValid: await this.isValid(userCode), data: null };
    } catch (error) {
      return { isValid: false, data: error.message };
    }
  }

  async generate(userId: number): Promise<GenerationStatus> {
    try {
      await this.validateEnabled(userId);
      const loginCode = CryptoService.generateRandomString(LOGIN_CODE_SIZE);
      const hashedCode = CryptoService.getHash(loginCode);
      await this.saveUserCode(userId, hashedCode);
      await this.sendEmailToUser(userId, loginCode);
      return { generated: true, data: null };
    } catch (error) {
      return { generated: false, data: error.message };
    }
  }

  private async validateEnabled(userId: number) {
    const enabled = await this.isEnabled(userId);
    if (!enabled) throw new Error('The Email 2FA is not enabled');
  }

  async isEnabled(userId: number): Promise<boolean> {
    const enabledAuthsFound = await this.userAuths.getByTypeAndUser(
      userId,
      AuthCodeTypes.EMAIL,
    );
    return enabledAuthsFound.length > 0;
  }

  private async isValid(userCode: MultiFactorAuthCode) {
    if (!userCode) throw new BadRequestException('Invalid code');

    const creationTime = new Date(userCode.createdAt.getTime());
    const limitTime = new Date(creationTime.getTime());
    limitTime.setSeconds(creationTime.getSeconds() + userCode.secondsDuration);
    return limitTime > new Date();
  }

  private async sendEmailToUser(userId: number, code: string) {
    const user = await this.userService.findOneUser(userId);
    const { email, firstName, lastName } = user;
    return await this.emailService.send(
      email,
      `Your login code ${code}`,
      `Hello ${firstName} ${lastName} here is your login code: ${code}`,
    );
  }

  private async getUserCode(userId: number, code: string) {
    try {
      return await this.authCodeService.findOne(
        code,
        AuthCodeTypes.EMAIL,
        userId,
      );
    } catch (error) {
      return null;
    }
  }

  private async saveUserCode(userId: number, code: string) {
    try {
      await this.authCodeService.create({
        code,
        codeType: AuthCodeTypes.EMAIL,
        userId,
      });
    } catch (Exception) {
      throw new Error(`Can't generate login code to user`);
    }
  }

  private async deleteUserCode(userId: number, code: string) {
    return await this.authCodeService.delete(code, userId, AuthCodeTypes.EMAIL);
  }
}
