import { Test, TestingModule } from '@nestjs/testing';
import { TotpTwoFactorAuthService } from './totp-two-factor-auth.service';

describe('TotpTwoFactorAuthService', () => {
  let service: TotpTwoFactorAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TotpTwoFactorAuthService],
    }).compile();

    service = module.get<TotpTwoFactorAuthService>(TotpTwoFactorAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
