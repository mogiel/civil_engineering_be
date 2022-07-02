import { Test, TestingModule } from '@nestjs/testing';
import { CalculationsForFireProtectionController } from './calculations-for-fire-protection.controller';

describe('CalculationsForFireProtectionController', () => {
  let controller: CalculationsForFireProtectionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CalculationsForFireProtectionController],
    }).compile();

    controller = module.get<CalculationsForFireProtectionController>(CalculationsForFireProtectionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
