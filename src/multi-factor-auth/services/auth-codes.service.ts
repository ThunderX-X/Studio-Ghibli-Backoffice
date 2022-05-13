import { Injectable } from '@nestjs/common';
import CrudService from 'src/common/crud-service';
import { FindConditions, Repository } from 'typeorm';
import { MultiFactorAuthCode } from '../entities/multi-factor-auth-codes.entity';
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
    return super.findOneById(code, where);
  }
}
