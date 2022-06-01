import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CrudService from 'src/common/crud-service';
import { Permission } from 'src/database/entities/permissions.entity';
import { RolePermission } from 'src/database/entities/role-permissions.entity';
import { User } from 'src/database/entities/user.entity';
import { UsersService } from 'src/users/services/users.service';
import { Repository } from 'typeorm';
import { ModulePermissionPayload } from '../models/module-payload.model';

@Injectable()
export class PermissionsService extends CrudService<Permission> {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(RolePermission)
    private readonly permissionsRepository: Repository<RolePermission>,
  ) {
    super(Permission);
  }

  async getUserPermissions(userId: number): Promise<Permission[]> {
    const user = await this.usersService.findById(userId);
    if (!this.userIsActive(user)) return [];
    const rolePermissions = await this.permissionsRepository.find({
      relations: ['permission'],
      where: {
        role: user.role,
      },
    });
    const permissions = rolePermissions
      ?.filter((permission) => permission.permission.active)
      ?.map((permission) => permission.permission);

    return permissions;
  }

  private userIsActive(user: User) {
    return user.active && user.role.active;
  }
  async getAllPermissions() {
    return await super.getAll({}, ['module']);
  }

  async getPermissionsByIds(ids: number[]): Promise<Permission[]> {
    return await super.repository.findByIds(ids);
  }

  async getPermissionsAsPayloadType(
    userId: number,
  ): Promise<ModulePermissionPayload[]> {
    const permissions = await this.getUserPermissions(userId);
    return (
      permissions?.map((permission) => {
        return {
          id: permission.moduleId,
          create: permission.create,
          read: permission.read,
          update: permission.update,
          delete: permission.delete,
        } as ModulePermissionPayload;
      }) || []
    );
  }
}
