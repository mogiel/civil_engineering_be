import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";

import { CalculationsForFireProtectionModule } from './calculations-for-fire-protection/calculations-for-fire-protection.module';
import { AboutModule } from './about/about.module';
import {typeOrmAsyncConfig} from "./config/typeorm.config";


require('dotenv').config({ path: './.env' })

@Module({
  imports: [
      ConfigModule.forRoot({
          envFilePath: ['.env'],
          isGlobal: true,
          cache: true
      }),
      TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
      CalculationsForFireProtectionModule,
      AboutModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
