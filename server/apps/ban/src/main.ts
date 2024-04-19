/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { BanModule } from './app/ban.module';

async function bootstrap() {
  const app = await NestFactory.create(BanModule);
  await app.init();
  Logger.log(
    `🚀 Application is running on`
  );
}

bootstrap();
