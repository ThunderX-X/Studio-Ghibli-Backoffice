import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dtos';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  findAllUsers() {
    return this.userRepo.find();
  }

  async findOneUser(id: number) {
    const user = await this.userRepo.findOne({ id })
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  createUser(data: CreateUserDto) {
    const newUser = this.userRepo.create(data);
    return this.userRepo.save(newUser);
  }

  async updateUser(id: number, changes: UpdateUserDto) {
    const user = await this.userRepo.findOne({ id });
    this.userRepo.merge(user, changes);
    return this.userRepo.save(user);
  }

  remove(id: number) {
    return this.userRepo.delete(id);
  }
}

//private counterId = 1;
// private users: User[] = [
//   {
//     id: 1,
//     first_name: 'Isaac',
//     last_name: 'Samuel',
//     email: 'isaac@gmail.com',
//     active: 'True',
//     profile_picture: 'picture.com',
//     password: '123',
//     rol_id: 'admmin',
//     //created_at: '16/05/2022',
//     //updated_at: '17/05/2022',
//   },
// ];

//   createUser(payload: CreateUserDto) {
//     console.log(payload);
//     this.counterId = this.counterId + 1;
//     const newUser = {
//       id: this.counterId,
//       ...payload,
//     };
//     this.users.push(newUser);
//     return newUser;
//   }

//   updateUser(id: number, payload: UpdateUserDto) {
//     const user = this.findOneUser(id);
//     if (user) {
//       const index = this.users.findIndex((item) => item.id === id);
//       this.users[index] = {
//         ...user,
//         ...payload,
//       };
//       return this.users[index];
//     }
//     return null;
//   }

//   findAllUsers() {
//     const dbName = this.configService.get('DATABASE_NAME');
//     console.log(dbName);
//     return this.users;
//   }

//   findOneUser(id: number) {
//     const user = this.users.find((item) => item.id === id);
//     if (!user) {
//       throw new NotFoundException(`User # ${id} not found`);
//     }
//     return user;
//   }

//   remove(id: number) {
//     const index = this.users.findIndex((item) => item.id === id);
//     if (index === -1) {
//       throw new NotFoundException(`User #${id} not found`);
//     }
//     this.users.splice(index, 1);
//     return true;
//   }
// }
