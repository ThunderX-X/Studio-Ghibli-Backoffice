import { Test, TestingModule } from '@nestjs/testing';
import { EmailTwoFactorAuthenticationService } from './email-two-factor-authentication.service';

describe('EmailTwoFactorAuthenticationService', () => {
  let service: EmailTwoFactorAuthenticationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailTwoFactorAuthenticationService],
    }).compile();

    service = module.get<EmailTwoFactorAuthenticationService>(
      EmailTwoFactorAuthenticationService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
