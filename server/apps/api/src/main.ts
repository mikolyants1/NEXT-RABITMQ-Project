/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import {IoAdapter} from '@nestjs/platform-socket.io';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger'
import { ApiModule } from './app/api.module';
import {
  BanDto,
  MessDto,
  CheckDto,
  FavorDto,
  FilmsDto,
  FavorFilmDto,
  UsersDto,
  CommentDto,
  CommentsDto
} from '@server1/apidocs';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);
  app.enableCors();
  app.useWebSocketAdapter(new IoAdapter(app));
  const globalPrefix = 'api';
  const config = new DocumentBuilder()
  .setTitle("Api documentation")
  .setDescription("my test documentation")
  .setVersion('1.0')
  .addTag("films")
  .build();
  const doc = SwaggerModule.createDocument(app,config,{
    extraModels:[
      BanDto,
      MessDto,
      CheckDto,
      FavorDto,
      FilmsDto,
      FavorDto,
      FavorFilmDto,
      UsersDto,
      CommentDto,
      CommentsDto
    ]
  })
  SwaggerModule.setup("swagger/docs",app,doc)
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;
  await app.listen(port);
  app.init();
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
