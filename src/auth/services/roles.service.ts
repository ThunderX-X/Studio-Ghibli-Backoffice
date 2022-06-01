import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from 'src/database/entities/permissions.entity';
import { RolePermission } from 'src/database/entities/role-permissions.entity';
import { Repository } from 'typeorm';
import CrudService from '../../common/crud-service';
import { Role } from '../../database/entities/roles.entity';
import { CreateRoleDto, UpdateRoleDto } from '../dtos/roles.dto';

@Injectable()
export class RolesService extends CrudService<Role> {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionsRepository: Repository<Permission>,
    @InjectRepository(RolePermission)
    private readonly rolePermissionsRepository: Repository<RolePermission>,
  ) {
    super(Role);
  }

  async getRoleById(id: number): Promise<Role> {
    return await super.getOneById(id, {}, [
      'rolePermissions',
      'rolePermissions.permission',
    ]);
  }

  async getAllRoles(): Promise<Role[]> {
    return await super.getAll({}, [
      'rolePermissions',
      'rolePermissions.permission',
    ]);
  }

  async createRole(roleInfo: CreateRoleDto) {
    const newRole = await super.make({
      ...roleInfo,
    });
    await this.createRolePermissionsFromIds(newRole, roleInfo.permissions);

    return await this.getRoleById(newRole.id);
  }

  async updateRole(roleId: number, updateRole: UpdateRoleDto) {
    const role = await super.modify(roleId, { ...updateRole });
    if (updateRole.permissions && updateRole.permissions?.length > 0) {
      await this.rolePermissionsRepository.delete({ role });
      await this.createRolePermissionsFromIds(role, updateRole.permissions);
    }

    return await this.getRoleById(role.id);
  }

  async deleteRole(roleId: number) {
    return await super.modify(roleId, { active: false });
  }

  private async createRolePermissionsFromIds(
    role: Role,
    permissionsIds: number[],
  ) {
    const permissions = await this.permissionsRepository.findByIds(
      permissionsIds,
    );
    const rolePermissions = permissions?.map((permission) =>
      this.rolePermissionsRepository.create({
        role,
        permission,
      }),
    );
    return await this.rolePermissionsRepository.save(rolePermissions);
  }
}
