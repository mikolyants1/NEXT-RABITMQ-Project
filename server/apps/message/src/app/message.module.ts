import { Module } from '@nestjs/common';
import {MongoConfig,RMQConfig} from '@server1/configs';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RMQModule } from 'nestjs-rmq';
import { ConfigModule } from '@nestjs/config';
import { Mess, MessSchema } from '@server1/models';

@Module({
  imports: [
    MongooseModule.forRootAsync(MongoConfig()),
    RMQModule.forRootAsync(RMQConfig()),
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:"./envs/.message.env"
    }),
    MongooseModule.forFeature([
      {name:Mess.name,schema:MessSchema}
    ])
  ],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
