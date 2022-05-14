import { Body, Controller, Post } from '@nestjs/common';
import { CreateUser } from '../dtos/user.dto';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  createUser(@Body() user: CreateUser) {
    this.usersService.create(user);
  }
}
