import { SetMetadata } from '@nestjs/common';
import { PermissionTypes } from '../enums/permissionsType.enum';

export const PERMISSIONS_METADATA_NAME = 'RequiredPermissions';

export const RequiredPermissions = (...args: PermissionTypes[]) =>
  SetMetadata(PERMISSIONS_METADATA_NAME, args);
