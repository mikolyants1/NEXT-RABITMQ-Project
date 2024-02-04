import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {IoAdapter} from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT:number = 5000;
  app.useWebSocketAdapter(new IoAdapter(app));
  app.enableCors();
  await app.listen(PORT,():void=>{
    console.log(`server runs on ${PORT}`)
  });
}
bootstrap();
