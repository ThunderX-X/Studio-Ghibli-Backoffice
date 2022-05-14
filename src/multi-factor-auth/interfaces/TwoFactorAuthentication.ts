export type GenerationStatus = {
  generated: boolean;
  data: any;
};

export type ValidationStatus = {
  isValid: boolean;
  data: any;
};
export interface TwoFactorAuthentication {
  generate(userId: number): Promise<GenerationStatus>;
  validate(userId: number, code: string): Promise<ValidationStatus>;
  isEnabled(userId: number): Promise<boolean>;
}
