import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RolesService } from 'src/auth/services/roles.service';
import { CryptoService } from '../../common/crypto.service';

import { User } from '../../database/entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

import { DeepPartial } from 'typeorm';
import { UserAuthsService } from 'src/multi-factor-auth/services/user-auths.service';
import { AuthCodeTypes } from 'src/multi-factor-auth/enums/auth-codes.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private readonly rolesService: RolesService,
    private readonly userAuthsService: UserAuthsService,
  ) {}

  findAllUsers() {
    return this.userRepo.find({
      where: {
        active: true,
      },
      relations: ['role'],
    });
  }

  async findOneUser(id: number) {
    const user = await this.userRepo.findOne({
      where: {
        id,
        active: true,
      },
      relations: ['role'],
    });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async enableUserTwoFactorMethods(user: User, creationData: CreateUserDto) {
    creationData.twoFactorMethods?.forEach(
      async (method) =>
        await this.userAuthsService.create(
          user.id,
          AuthCodeTypes[method] as any,
        ),
    );
  }

  async updateUserTwoFactorMethods(user: User, updateData: UpdateUserDto) {
    if (updateData.twoFactorMethods?.length > 0)
      await this.userAuthsService.deleteAll(user.id);
    updateData.twoFactorMethods?.forEach(
      async (method) =>
        await this.userAuthsService.create(
          user.id,
          AuthCodeTypes[method] as any,
        ),
    );
  }

  async createUser(data: CreateUserDto) {
    data.password = !!data.password
      ? await CryptoService.hashPassword(data.password)
      : data.password;
    const { roleId } = data;
    const role = await this.rolesService.getRoleById(roleId);
    let newUser = this.userRepo.create({ ...data, role });
    newUser = await this.userRepo.save(newUser);
    await this.enableUserTwoFactorMethods(newUser, data);

    return newUser;
  }

  async updateUser(id: number, changes: UpdateUserDto) {
    const user = await this.userRepo.findOne({ id });
    const { roleId } = changes;
    const role = (await this.rolesService.getRoleById(roleId)) || user.role;
    this.userRepo.merge(user, { ...changes, role });
    const updatedUser = await this.userRepo.save(user);
    await this.updateUserTwoFactorMethods(updatedUser, changes);

    return this.findOneUser(updatedUser.id);
  }

  remove(id: number) {
    return this.userRepo.update(id, { active: false });
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
