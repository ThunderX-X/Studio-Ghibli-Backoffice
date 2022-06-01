import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AplicationModule } from 'src/auth/decorators/app-module.decorator';
import { RequiredPermissions } from 'src/auth/decorators/required-permissions.decorator';
import { ModulesEnum } from 'src/auth/enums/modules.enum';
import { PermissionTypes } from 'src/auth/enums/permissionsType.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ErrorResponse } from 'src/common/error-response.model';
import { CreateUser } from '../dtos/user.dto';
import { UsersService } from '../services/users.service';

@ApiTags('users')
@Controller('users')
@AplicationModule(ModulesEnum.USERS)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('Logued'), RolesGuard)
  @RequiredPermissions(PermissionTypes.CREATE)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiCreatedResponse()
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: ErrorResponse,
  })
  @ApiForbiddenResponse({
    description: 'Not authenticated',
    type: ErrorResponse,
  })
  @ApiOperation({
    summary: `This endpoint create a new user`,
    description: `This endpoint creates a new user in the database with the privided data`,
  })
  createUser(@Body() user: CreateUser) {
    this.usersService.create(user);
  }
}
