export interface TwoFactorAuthentication {
  generate(userId: number, params): Promise<boolean>;
  validate(userId: number, params): Promise<boolean>;
}
