import { Injectable } from '@nestjs/common';
import CrudService from 'src/common/crud-service';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService extends CrudService<User> {
  constructor() {
    super(User);
  }

  async findOne(userId: number) {
    return await super.findOneById(userId);
  }
}
