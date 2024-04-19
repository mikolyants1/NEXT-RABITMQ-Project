/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { MessageModule } from './app/message.module';

async function bootstrap() {
  const app = await NestFactory.create(MessageModule);
  await app.init();
  Logger.log(
    `🚀 Application is running on`
  );
}

bootstrap();
