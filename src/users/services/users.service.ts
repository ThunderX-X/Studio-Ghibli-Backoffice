import { Injectable } from '@nestjs/common';
import { RolesService } from 'src/auth/services/roles.service';
import CrudService from '../../common/crud-service';
import { CryptoService } from '../../common/crypto.service';
import { User } from '../../database/entities/user.entity';
import { CreateUser, UpdateUser } from '../dtos/user.dto';
import { DeepPartial } from 'typeorm';
@Injectable()
export class UsersService extends CrudService<User> {
  constructor(private readonly rolesService: RolesService) {
    super(User);
  }

  async create(user: CreateUser) {
    user.password = !!user.password
      ? await CryptoService.hashPassword(user.password)
      : user.password;
    const { roleId } = user;
    const role = await this.rolesService.getRoleById(roleId);

    return await super.make({ ...user, role: role });
  }

  async update(userId: number, user: UpdateUser) {
    const {
      roleId,
      active,
      email,
      firstName,
      lastName,
      password,
      profilePicture,
    } = user;
    const role = await this.rolesService.getRoleById(roleId);
    return await super.modify(userId, {
      active,
      email,
      firstName,
      lastName,
      password,
      profilePicture,
      role,
    });
  }

  async findById(userId: number) {
    return await super.getOneById(userId, {}, ['role']);
  }

  async findByEmail(email: string) {
    const user = await super.getAll({ email });
    return user[0];
  }

  async findByConditions(conditions: DeepPartial<User>) {
    const user = await super.getAll(conditions);
    return user[0];
  }
}
