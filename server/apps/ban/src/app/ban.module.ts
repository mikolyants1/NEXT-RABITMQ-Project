import { Module } from '@nestjs/common';
import { BanController } from './ban.controller';
import { BanService } from './ban.service';
import {RMQConfig, RedisConfig} from '@server1/configs'
import { RMQModule } from 'nestjs-rmq';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from '@nestjs-modules/ioredis';

@Module({
  imports: [
    RedisModule.forRootAsync(RedisConfig()),
    RMQModule.forRootAsync(RMQConfig()),
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:"./envs/.ban.env"
    }),
  ],
  controllers: [BanController],
  providers: [BanService],
})
export class BanModule {}
