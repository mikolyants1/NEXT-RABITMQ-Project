/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FilmModule } from './app/films.module';

async function bootstrap() {
  const app = await NestFactory.create(FilmModule);
  await app.init();
  Logger.log(`🚀 films is running on`);
}

bootstrap();
