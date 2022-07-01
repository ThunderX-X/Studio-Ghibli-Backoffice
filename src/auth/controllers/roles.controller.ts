import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiForbiddenResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ErrorResponse } from 'src/common/error-response.model';
import { AplicationModule } from '../decorators/app-module.decorator';
import { RequiredPermissions } from '../decorators/required-permissions.decorator';
import { CreateRoleDto, UpdateRoleDto } from '../dtos/roles.dto';
import { ModulesEnum } from '../enums/modules.enum';
import { PermissionTypes } from '../enums/permissionsType.enum';
import { RolesGuard } from '../guards/roles.guard';
import { RolesService } from '../services/roles.service';

@ApiTags('roles')
@Controller('roles')
@AplicationModule(ModulesEnum.ROLES)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  @UseGuards(AuthGuard('Logued'), RolesGuard)
  @RequiredPermissions(PermissionTypes.READ)
  @ApiBearerAuth()
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: ErrorResponse,
  })
  @ApiForbiddenResponse({
    description: 'Not authenticated',
    type: ErrorResponse,
  })
  @ApiOperation({
    summary: `This endpoint list all system roles with their permissions`,
    description: `This endpoint list all system roles with their permissions`,
  })
  async GetRoles() {
    return await this.rolesService.getAllRoles();
  }

  @Get(':id')
  @UseGuards(AuthGuard('Logued'), RolesGuard)
  @RequiredPermissions(PermissionTypes.READ)
  @ApiBearerAuth()
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: ErrorResponse,
  })
  @ApiForbiddenResponse({
    description: 'Not authenticated',
    type: ErrorResponse,
  })
  @ApiOperation({
    summary: `This endpoint get a role with their permissions`,
    description: `This endpoint get a role with their permissions`,
  })
  async GetRole(@Param('id') roleId: number) {
    return await this.rolesService.getRoleById(roleId);
  }

  @Post()
  @UseGuards(AuthGuard('Logued'), RolesGuard)
  @RequiredPermissions(PermissionTypes.CREATE)
  @ApiBearerAuth()
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: ErrorResponse,
  })
  @ApiForbiddenResponse({
    description: 'Not authenticated',
    type: ErrorResponse,
  })
  @ApiOperation({
    summary: `This endpoint creates a new role with the especied permissions`,
    description: `This endpoint creates a new role with the especied permissions`,
  })
  @ApiBody({ type: CreateRoleDto })
  async CreateRole(@Body() roleInfo: CreateRoleDto) {
    return await this.rolesService.createRole(roleInfo);
  }

  @Put('/:id')
  @UseGuards(AuthGuard('Logued'), RolesGuard)
  @RequiredPermissions(PermissionTypes.UPDATE)
  @ApiBearerAuth()
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: ErrorResponse,
  })
  @ApiForbiddenResponse({
    description: 'Not authenticated',
    type: ErrorResponse,
  })
  @ApiOperation({
    summary: `This endpoint update a role with the especied data`,
    description: `This endpoint update a role with the especied data`,
  })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateRoleDto })
  async UpdateRole(
    @Param('id') roleId: number,
    @Body() updatedRole: UpdateRoleDto,
  ) {
    return await this.rolesService.updateRole(roleId, updatedRole);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('Logued'), RolesGuard)
  @RequiredPermissions(PermissionTypes.DELETE)
  @ApiBearerAuth()
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: ErrorResponse,
  })
  @ApiForbiddenResponse({
    description: 'Not authenticated',
    type: ErrorResponse,
  })
  @ApiOperation({
    summary: `This endpoint inativate a role`,
    description: `This endpoint inativate a role`,
  })
  @ApiParam({ name: 'id', type: Number })
  async DeleteRole(@Param('id') roleId: number) {
    return await this.rolesService.deleteRole(roleId);
  }
}
