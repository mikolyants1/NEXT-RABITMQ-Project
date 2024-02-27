import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {IoAdapter} from '@nestjs/platform-socket.io';

async function bootstrap():Promise<void> {
  const app = await NestFactory.create(AppModule);
  const io = new IoAdapter(app);
  app.useWebSocketAdapter(io);
  const PORT:number = 5000;
  app.enableCors();
  await app.listen(PORT,():void=>{
    console.log(`server runs on ${PORT}`)
  });
}
bootstrap();
