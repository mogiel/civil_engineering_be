import { Module } from '@nestjs/common';
import { CalculationsForFireProtectionController } from './calculations-for-fire-protection.controller';
import { CalculationsForFireProtectionService } from './calculations-for-fire-protection.service';

@Module({
  controllers: [CalculationsForFireProtectionController],
  providers: [CalculationsForFireProtectionService]
})
export class CalculationsForFireProtectionModule {}
