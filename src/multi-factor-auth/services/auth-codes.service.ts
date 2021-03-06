import { Injectable } from '@nestjs/common';
import CrudService from '../../common/crud-service';
import { DeepPartial, FindConditions } from 'typeorm';
import { MultiFactorAuthCode } from '../../database/entities/multi-factor-auth-codes.entity';
import { AuthCodeTypes } from '../enums/auth-codes.enum';

@Injectable()
export class AuthCodesService extends CrudService<MultiFactorAuthCode> {
  constructor() {
    super(MultiFactorAuthCode);
  }

  findOne(
    code: string,
    codeType: AuthCodeTypes,
    userId: number,
  ): Promise<MultiFactorAuthCode> {
    const where: FindConditions<MultiFactorAuthCode> = {
      codeType: codeType,
      userId: userId,
    };
    return super.getOneById(code, where);
  }

  async findOneCode(
    codeType: AuthCodeTypes,
    userId: number,
  ): Promise<MultiFactorAuthCode> {
    const codes = await super.getAll({ codeType, userId });
    if (codes.length > 1) throw new Error('More than one code found');
    return codes[0];
  }

  async create(authCode: DeepPartial<MultiFactorAuthCode>) {
    return super.make(authCode);
  }

  async delete(code: string, userId: number, codeType: AuthCodeTypes) {
    return super.remove({
      code,
      userId,
      codeType,
    });
  }
}
