import { Test, TestingModule } from '@nestjs/testing';
import { MultiFactorAuthService } from './multi-factor-auth.service';

describe('MultiFactorAuthService', () => {
  let service: MultiFactorAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MultiFactorAuthService],
    }).compile();

    service = module.get<MultiFactorAuthService>(MultiFactorAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
