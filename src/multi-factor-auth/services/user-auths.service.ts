import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CrudService from 'src/common/crud-service';
import { AuthTypeUser } from 'src/database/entities/auth-types-user.entity';
import { Repository } from 'typeorm';
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
    return await super.getAll({ userId, authTypeId: codeType });
  }

  async create(userId: number, codeType: AuthCodeTypes) {
    return await super.make({ userId, authTypeId: codeType });
  }

  async delete(userId: number, codeType: AuthCodeTypes) {
    return await super.removeByConditions({ userId, authTypeId: codeType });
  }
}
