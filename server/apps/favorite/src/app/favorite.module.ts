import { Module } from '@nestjs/common';
import { FavoriteController } from './favorite.controller';
import { FavoriteService } from './favorite.service';
import { RMQConfig, RedisConfig } from '@server1/configs';
import { RMQModule } from 'nestjs-rmq';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from '@nestjs-modules/ioredis';
@Module({
  imports: [
    RMQModule.forRootAsync(RMQConfig()),
    RedisModule.forRootAsync(RedisConfig()),
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:"./envs/.favorite.env"
    })
  ],
  controllers: [FavoriteController],
  providers: [FavoriteService],
})
export class FavoriteModule {}
