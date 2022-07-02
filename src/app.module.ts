import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";

import { CalculationsForFireProtectionModule } from './calculations-for-fire-protection/calculations-for-fire-protection.module';

require('dotenv').config({ path: './.env' })

@Module({
  imports: [
      TypeOrmModule.forRoot({
          "type": "mysql",
          "host": process.env.DATABASE_HOST,
          "port": parseInt(process.env.DATABASE_PORT),
          "username": process.env.DATABASE_USER,
          "password": process.env.DATABASE_PASSWORD,
          "database": process.env.DATABASE_NAME,
          "entities": ["dist/**/**.entity{.ts,.js}"],
          "logging": true,
          "synchronize": true,
          "ssl": false
      }),
      CalculationsForFireProtectionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
