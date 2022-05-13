import { Inject, Injectable } from '@nestjs/common';
import { MultiFactorAuthCode } from '../../database/entities/multi-factor-auth-codes.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthCodesService } from './auth-codes.service';
import {
  GenerateOperationStatus,
  TwoFactorAuthentication,
} from '../interfaces/TwoFactorAuthentication';
import { EmailService } from '../../common/email.service';
import { UsersService } from '../../users/services/users.service';
import { CryptoService } from '../../common/crypto.service';
import { AuthCodeTypes } from '../enums/auth-codes.enum';

const LOGIN_CODE_SIZE = 10;

@Injectable()
export class EmailTwoFactorAuthenticationService
  implements TwoFactorAuthentication
{
  constructor(
    @InjectRepository(MultiFactorAuthCode)
    private readonly authCodesRepo: Repository<MultiFactorAuthCode>,
    private readonly authCodeService: AuthCodesService,
    private readonly emailService: EmailService,
    private readonly userService: UsersService,
  ) {}

  async validate(userId: number, code: string): Promise<boolean> {
    const hashedCode = CryptoService.getHash(code);
    const userCode = await this.getUserCode(userId, hashedCode);
    if (userCode) {
      await this.deleteUserCode(userId, hashedCode);
    }
    return this.isValid(userCode);
  }

  async generate(userId: number): Promise<GenerateOperationStatus> {
    try {
      const loginCode = CryptoService.generateRandomString(LOGIN_CODE_SIZE);
      const hashedCode = CryptoService.getHash(loginCode);
      await this.saveUserCode(userId, hashedCode);
      await this.sendEmailToUser(userId, loginCode);
      return { generated: true, data: null };
    } catch (error) {
      return { generated: false, data: error };
    }
  }

  private async isValid(userCode: MultiFactorAuthCode) {
    if (!userCode) return false;

    const creationTime = new Date(userCode.createdAt.getTime());
    const limitTime = new Date(creationTime.getTime());
    limitTime.setSeconds(creationTime.getSeconds() + userCode.secondsDuration);
    return limitTime > new Date();
  }

  private async sendEmailToUser(userId: number, code: string) {
    const user = await this.userService.findOne(userId);
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
      const userCode = this.authCodesRepo.create({
        code,
        codeType: AuthCodeTypes.EMAIL,
        userId,
      });
      await this.authCodesRepo.save(userCode);
    } catch (Exception) {
      throw new Error(`Can't generate login code to user`);
    }
  }

  private async deleteUserCode(userId: number, code: string) {
    return await this.authCodesRepo.delete({
      code,
      userId,
      codeType: AuthCodeTypes.EMAIL,
    });
  }
}
