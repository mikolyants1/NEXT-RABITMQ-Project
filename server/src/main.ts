import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {IoAdapter} from '@nestjs/platform-socket.io';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

async function bootstrap():Promise<void> {
  const app = await NestFactory.create(AppModule);
  const io:IoAdapter = new IoAdapter(app);
  app.useWebSocketAdapter(io);
  const PORT:number = 5000;
  app.enableCors();
  const config:Omit<OpenAPIObject,"paths"> = new DocumentBuilder()
  .setTitle("Api documentation")
  .setDescription("my test documentation")
  .setVersion('1.0')
  .build();
  const doc:OpenAPIObject = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('api',app,doc);
  await app.listen(PORT,():void=>{
    console.log(`server runs on ${PORT}`)
  });
}
bootstrap();
