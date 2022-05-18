import { Test, TestingModule } from '@nestjs/testing';
import { UserAuthsService } from './user-auths.service';

describe('UserAuthsService', () => {
  let service: UserAuthsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserAuthsService],
    }).compile();

    service = module.get<UserAuthsService>(UserAuthsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
