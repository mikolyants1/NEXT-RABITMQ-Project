/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FavoriteModule } from './app/favorite.module';

async function bootstrap() {
  const app = await NestFactory.create(FavoriteModule);
  await app.init();
  Logger.log(
    `🚀 Application is running on`
  );
}

bootstrap();
