/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AccountModule } from './app/account.module';

async function bootstrap() {
  const app = await NestFactory.create(AccountModule);
  await app.init();
  Logger.log(`🚀 account is running`);
}

bootstrap();
