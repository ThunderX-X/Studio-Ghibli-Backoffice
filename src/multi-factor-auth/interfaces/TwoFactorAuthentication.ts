export type GenerateOperationStatus = {
  generated: boolean;
  data: any;
};
export interface TwoFactorAuthentication {
  generate(userId: number): Promise<GenerateOperationStatus>;
  validate(userId: number, code: string): Promise<boolean>;
}
