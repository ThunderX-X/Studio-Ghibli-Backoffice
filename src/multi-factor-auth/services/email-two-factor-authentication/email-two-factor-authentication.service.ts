import { Injectable } from '@nestjs/common';
import { MultiFactorAuthCode } from '../../entities/multi-factor-auth-codes.entity';
import CrudService from 'src/database/crud-service';

@Injectable()
class EmailTwoFactorAuthenticationService extends CrudService<MultiFactorAuthCode> {
  constructor() {
    super(MultiFactorAuthCode);
  }
}

export { EmailTwoFactorAuthenticationService };
