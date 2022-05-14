import { Injectable } from '@nestjs/common';
import CrudService from 'src/common/crud-service';
import { User } from '../../database/entities/user.entity';

@Injectable()
export class UsersService extends CrudService<User> {
  constructor() {
    super(User);
  }

  async findOne(userId: number) {
    return await super.getOneById(userId);
  }

  async findByEmail(email: string) {
    const user = await super.getAll({ email });
    return user[0];
  }
}
