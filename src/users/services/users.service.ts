import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RolesService } from 'src/auth/services/roles.service';
import { CryptoService } from '../../common/crypto.service';

import { User } from '../../database/entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

import { DeepPartial } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private readonly rolesService: RolesService,
  ) {}

  findAllUsers() {
    return this.userRepo.find({ relations: ['role'] });
  }

  async findOneUser(id: number) {
    const user = await this.userRepo.findOne({ id }, { relations: ['role'] });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async createUser(data: CreateUserDto) {
    data.password = !!data.password
      ? await CryptoService.hashPassword(data.password)
      : data.password;
    const { roleId } = data;
    const role = await this.rolesService.getRoleById(roleId);

    const newUser = this.userRepo.create({ ...data, role });
    return this.userRepo.save(newUser);
  }

  async updateUser(id: number, changes: UpdateUserDto) {
    const user = await this.userRepo.findOne({ id });
    const { roleId } = changes;
    const role = await this.rolesService.getRoleById(roleId);
    this.userRepo.merge(user, { ...changes, role });
    return this.userRepo.save(user);
  }

  remove(id: number) {
    return this.userRepo.delete(id);
  }

  async findByEmail(email: string) {
    const user = await this.userRepo.find({ where: { email } });
    return user ? user[0] : null;
  }

  async findByConditions(conditions: DeepPartial<User>) {
    const user = await this.userRepo.find(conditions);
    return user ? user[0] : null;
  }
}
