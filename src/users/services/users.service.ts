import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dtos';

@Injectable()
export class UsersService {
  constructor(private configService: ConfigService) {}
  private counterId = 1;
  private users: User[] = [
    {
      id: 1,
      first_name: 'Isaac',
      last_name: 'Samuel',
      email: 'isaac@gmail.com',
      active: 'True',
      profile_picture: 'picture.com',
      password: '123',
      rol_id: 'admmin',
      //created_at: '16/05/2022',
      //updated_at: '17/05/2022',
    },
  ];

  createUser(payload: CreateUserDto) {
    console.log(payload);
    this.counterId = this.counterId + 1;
    const newUser = {
      id: this.counterId,
      ...payload,
    };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id: number, payload: UpdateUserDto) {
    const user = this.findOneUser(id);
    if (user) {
      const index = this.users.findIndex((item) => item.id === id);
      this.users[index] = {
        ...user,
        ...payload,
      };
      return this.users[index];
    }
    return null;
  }

  findAllUsers() {
    const dbName = this.configService.get('DATABASE_NAME');
    console.log(dbName);
    return this.users;
  }

  findOneUser(id: number) {
    const user = this.users.find((item) => item.id === id);
    if (!user) {
      throw new NotFoundException(`User # ${id} not found`);
    }
    return user;
  }

  remove(id: number) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`User #${id} not found`);
    }
    this.users.splice(index, 1);
    return true;
  }
}
