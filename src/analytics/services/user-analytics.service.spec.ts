import { Test, TestingModule } from '@nestjs/testing';
import { UserAnalyticsService } from './user-analytics.service';

describe('UserAnalyticsService', () => {
  let service: UserAnalyticsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserAnalyticsService],
    }).compile();

    service = module.get<UserAnalyticsService>(UserAnalyticsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
