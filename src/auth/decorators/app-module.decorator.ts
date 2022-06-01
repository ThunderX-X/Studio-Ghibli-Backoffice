import { SetMetadata } from '@nestjs/common';
import { ModulesEnum } from '../enums/modules.enum';

export const MODULE_METADATA_NAME = 'RequiredModule';

export const AplicationModule = (requiredModule: ModulesEnum) =>
  SetMetadata(MODULE_METADATA_NAME, requiredModule);
