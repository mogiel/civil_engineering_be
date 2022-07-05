import { Module } from '@nestjs/common';
import { CalculationsForFireProtectionController } from './calculations-for-fire-protection.controller';
import { CalculationsForFireProtectionService } from './calculations-for-fire-protection.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {FireEntity} from "./fire.entity";

@Module({
  imports: [
      TypeOrmModule.forFeature([FireEntity])
  ],
  controllers: [CalculationsForFireProtectionController],
  providers: [CalculationsForFireProtectionService]
})
export class CalculationsForFireProtectionModule {}
