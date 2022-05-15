import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TwoFactorGuard } from 'src/auth/guards/two-factor.guard';
import { CreateUser } from '../dtos/user.dto';
import { UsersService } from '../services/users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(TwoFactorGuard)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({
    summary: `This endpoint create a new user`,
    description: `This endpoint creates a new user in the database with the privided data`,
  })
  createUser(@Body() user: CreateUser) {
    this.usersService.create(user);
  }
}
