import { ApiProperty } from '@nestjs/swagger';

export class GenerationStatus {
  @ApiProperty()
  generated: boolean;

  @ApiProperty()
  data: any;
}

export class ValidationStatus {
  @ApiProperty()
  isValid: boolean;

  @ApiProperty()
  data: any;
}
export interface TwoFactorAuthentication {
  generate(userId: number): Promise<GenerationStatus>;
  validate(userId: number, code: string): Promise<ValidationStatus>;
  isEnabled(userId: number): Promise<boolean>;
}
