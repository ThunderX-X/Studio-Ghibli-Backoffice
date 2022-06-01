import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ModulesEnum } from '../enums/modules.enum';
import { PermissionTypes } from '../enums/permissionsType.enum';
import { ModulePermissionPayload } from '../models/module-payload.model';
import { Payload } from '../models/payload.model';
import { MODULE_METADATA_NAME } from '../decorators/app-module.decorator';
import { PERMISSIONS_METADATA_NAME } from '../decorators/required-permissions.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredPermissions = this.getRequiredPermissions(context);
    const requiredModulePermissions =
      this.getRequiredModulePermissions(context);
    const payload = this.getUserPayload(context);
    const userModulePermissions = this.getModulePermissions(
      payload,
      requiredModulePermissions,
    );
    const hasSufficientPermissions = this.checkPermissions(
      requiredPermissions,
      userModulePermissions,
    );
    if (!hasSufficientPermissions)
      throw new ForbiddenException(`You don't have the proper permissions`);
    return hasSufficientPermissions;
  }

  private getRequiredModulePermissions(context: ExecutionContext) {
    return this.reflector.get<ModulesEnum>(
      MODULE_METADATA_NAME,
      context.getClass(),
    );
  }

  private getRequiredPermissions(context: ExecutionContext) {
    return this.reflector.get<PermissionTypes[]>(
      PERMISSIONS_METADATA_NAME,
      context.getHandler(),
    );
  }

  private getModulePermissions(
    payload: Payload,
    requiredModulePermissions: ModulesEnum,
  ) {
    const modulePermissions = payload.permissions?.find(
      (modulePermissions) => modulePermissions.id === requiredModulePermissions,
    );
    if (!modulePermissions)
      throw new ForbiddenException(`You don't have permissions on the module`);

    return modulePermissions;
  }

  private getUserPayload(context: ExecutionContext): Payload {
    const request = context.switchToHttp().getRequest();
    const user = request.user as Payload;
    if (!user) throw new ForbiddenException('Not logued');
    return user;
  }

  private checkPermissions(
    requiredPermissions: any[],
    modulePermission: ModulePermissionPayload,
  ) {
    const matchs = requiredPermissions.map((requieredPermission) =>
      this.getPermissionValueFromPermissionType(
        modulePermission,
        requieredPermission,
      ),
    );

    return matchs.every((match) => match === true);
  }

  private getPermissionValueFromPermissionType(
    modulePermission: ModulePermissionPayload,
    requiredPermission: PermissionTypes,
  ): boolean {
    switch (requiredPermission) {
      case PermissionTypes.CREATE:
        return modulePermission.create;
      case PermissionTypes.READ:
        return modulePermission.read;
      case PermissionTypes.UPDATE:
        return modulePermission.update;
      case PermissionTypes.DELETE:
        return modulePermission.delete;
      default:
        return false;
    }
  }
}
