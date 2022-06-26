import { Injectable } from '@nestjs/common';
import CrudService from '../../common/crud-service';
import { AuthTypeUser } from '../../database/entities/auth-types-user.entity';
import { AuthCodeTypes } from '../enums/auth-codes.enum';

@Injectable()
export class UserAuthsService extends CrudService<AuthTypeUser> {
  constructor() {
    super(AuthTypeUser);
  }

  async getByUser(userId: number) {
    return await super.getAll({ userId });
  }

  async getByTypeAndUser(userId: number, codeType: AuthCodeTypes) {
    return await super.getAll({ userId, authType: codeType });
  }

  async create(userId: number, codeType: AuthCodeTypes) {
    return await super.make({ userId, authType: codeType });
  }

  async delete(userId: number, codeType: AuthCodeTypes) {
    return await super.removeByConditions({ userId, authType: codeType });
  }

  async deleteAll(userId: number) {
    return await super.removeByConditions({ userId });
  }

  async getAllByUser(userId: number) {
    return super.getAll({ userId }, ['authType']);
  }
}
