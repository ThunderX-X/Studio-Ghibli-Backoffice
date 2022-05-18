import { Injectable } from '@nestjs/common';
import CrudService from '../../common/crud-service';
import { CryptoService } from '../../common/crypto.service';
import { User } from '../../database/entities/user.entity';
import { CreateUser, UpdateUser } from '../dtos/user.dto';
@Injectable()
export class UsersService extends CrudService<User> {
  constructor() {
    super(User);
  }

  async create(user: CreateUser) {
    user.password = await CryptoService.hashPassword(user.password);
    return await super.make({ ...user });
  }

  async update(userId: number, user: UpdateUser) {
    return await super.modify(userId, { ...user });
  }

  async findOne(userId: number) {
    return await super.getOneById(userId);
  }

  async findByEmail(email: string) {
    const user = await super.getAll({ email });
    return user[0];
  }
}
