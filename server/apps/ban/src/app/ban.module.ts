import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { BanController } from './ban.controller';
import { BanService } from './ban.service';
import {MongoConfig,RMQConfig} from '@server1/configs'
import { RMQModule } from 'nestjs-rmq';
import { ConfigModule } from '@nestjs/config';
import {BanModel, BanSchema } from '@server1/models';

@Module({
  imports: [
    MongooseModule.forRootAsync(MongoConfig()),
    RMQModule.forRootAsync(RMQConfig()),
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:"./envs/.ban.env"
    }),
    MongooseModule.forFeature([
      {name:BanModel.name,schema:BanSchema}
    ])
  ],
  controllers: [BanController],
  providers: [BanService],
})
export class BanModule {}
