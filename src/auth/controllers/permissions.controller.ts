import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { ErrorResponse } from 'src/common/error-response.model';
import { AplicationModule } from '../decorators/app-module.decorator';
import { RequiredPermissions } from '../decorators/required-permissions.decorator';
import { ModulesEnum } from '../enums/modules.enum';
import { PermissionTypes } from '../enums/permissionsType.enum';
import { RolesGuard } from '../guards/roles.guard';
import { Payload } from '../models/payload.model';
import { PermissionsService } from '../services/permissions.service';

@ApiTags('permissions')
@Controller('permissions')
@AplicationModule(ModulesEnum.ROLES)
@UseInterceptors(ClassSerializerInterceptor)
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}
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
    summary: `This endpoint list all system permissions`,
    description: `This endpoint list all system permissions`,
  })
  async GetPermissions() {
    return await this.permissionsService.getAllPermissions();
  }

  @Get('me')
  @UseGuards(AuthGuard('Logued'))
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
    summary: `This endpoint list all permissions of the logued user`,
    description: `This endpoint list all permissions of the logued user`,
  })
  async GetLogueduserPermissions(@Req() req: Request) {
    const { sub: userId } = req.user as Payload;
    return await this.permissionsService.getUserPermissions(userId);
  }
}
