/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { CommentsModule } from './app/comments.module';

async function bootstrap() {
  const app = await NestFactory.create(CommentsModule);
  await app.init();
  Logger.log(
    `🚀 Application is running on`
  );
}

bootstrap();
