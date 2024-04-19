import { Module } from '@nestjs/common';
import { FavoriteController } from './favorite.controller';
import { FavoriteService } from './favorite.service';
import { MongoConfig, RMQConfig } from '@server1/configs';
import { MongooseModule } from '@nestjs/mongoose';
import {FavorModel, FavorShema} from '@server1/models';
import { RMQModule } from 'nestjs-rmq';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    MongooseModule.forRootAsync(MongoConfig()),
    RMQModule.forRootAsync(RMQConfig()),
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:"./envs/.favorite.env"
    }),
    MongooseModule.forFeature([
      {name:FavorModel.name,schema:FavorShema}
    ])
  ],
  controllers: [FavoriteController],
  providers: [FavoriteService],
})
export class FavoriteModule {}
