import { Test, TestingModule } from '@nestjs/testing';
import { CalculationsForFireProtectionService } from './calculations-for-fire-protection.service';

describe('CalculationsForFireProtectionService', () => {
  let service: CalculationsForFireProtectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalculationsForFireProtectionService],
    }).compile();

    service = module.get<CalculationsForFireProtectionService>(CalculationsForFireProtectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
