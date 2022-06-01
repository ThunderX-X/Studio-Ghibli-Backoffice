import { IsBoolean, IsNotEmpty, IsPositive } from 'class-validator';
import { ModulePermissionPayload } from './module-payload.model';

export class Payload {
  @IsNotEmpty()
  @IsPositive()
  sub: number;

  @IsNotEmpty()
  @IsBoolean()
  twoFactor: boolean;

  @IsNotEmpty()
  @IsBoolean()
  twoFactorAuth: boolean;

  permissions: ModulePermissionPayload[];
}
