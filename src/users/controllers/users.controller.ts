import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  ParseIntPipe,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Req,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AplicationModule } from 'src/auth/decorators/app-module.decorator';
import { RequiredPermissions } from 'src/auth/decorators/required-permissions.decorator';
import { ModulesEnum } from 'src/auth/enums/modules.enum';
import { PermissionTypes } from 'src/auth/enums/permissionsType.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ErrorResponse } from 'src/common/error-response.model';
import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { Payload } from 'src/auth/models/payload.model';
import { TwoFactorAuthService } from 'src/multi-factor-auth/services/two-factor-auth.service';

@ApiTags('users')
@Controller('users')
@AplicationModule(ModulesEnum.USERS)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private readonly twoFactorAuthService: TwoFactorAuthService,
  ) {}

  @Post('createUser')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard('Logued'), RolesGuard)
  @RequiredPermissions(PermissionTypes.CREATE)
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
  createUser(@Body() payload: CreateUserDto) {
    return this.usersService.createUser(payload);
  }

  @Get('me')
  @ApiOperation({ summary: 'View logued user info' })
  @UseGuards(AuthGuard('Logued'))
  @ApiBearerAuth()
  getMe(@Req() req) {
    const { sub: userId } = req.user as Payload;
    return this.getUser(userId);
  }

  @Get()
  @ApiOperation({ summary: 'View all users' })
  @UseGuards(AuthGuard('Logued'), RolesGuard)
  @RequiredPermissions(PermissionTypes.CREATE)
  @ApiBearerAuth()
  getUsers() {
    return this.usersService.findAllUsers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'View one user' })
  @HttpCode(HttpStatus.ACCEPTED)
  @UseGuards(AuthGuard('Logued'), RolesGuard)
  @RequiredPermissions(PermissionTypes.READ)
  @ApiBearerAuth()
  async getUser(@Param('id', ParseIntPipe) id: number) {
    const user = (await this.usersService.findOneUser(id)) as any;
    const availableTwoFactors =
      await this.twoFactorAuthService.getAvalilableAuthsUser(user.id);
    user.twoFactorMethods = availableTwoFactors.map(
      (method) => method.authType,
    );

    return user;
  }

  @Put(':id')
  @UseGuards(AuthGuard('Logued'), RolesGuard)
  @RequiredPermissions(PermissionTypes.UPDATE)
  @ApiBearerAuth()
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, payload);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('Logued'), RolesGuard)
  @RequiredPermissions(PermissionTypes.DELETE)
  @ApiBearerAuth()
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
