import { Test, TestingModule } from '@nestjs/testing';
import { AuthCodesService } from './auth-codes.service';

describe('AuthTypesService', () => {
  let service: AuthCodesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthCodesService],
    }).compile();

    service = module.get<AuthCodesService>(AuthCodesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
