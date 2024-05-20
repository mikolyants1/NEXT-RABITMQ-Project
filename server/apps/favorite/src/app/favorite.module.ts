import { Module } from '@nestjs/common';
import { FavoriteController } from './favorite.controller';
import { FavoriteService } from './favorite.service';
import { MongoConfig, RMQConfig} from '@server1/configs';
import { RMQModule } from 'nestjs-rmq';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { FavorModel, FavorShema } from '@server1/models';

@Module({
  imports: [
    RMQModule.forRootAsync(RMQConfig()),
    MongooseModule.forRootAsync(MongoConfig()),
    MongooseModule.forFeature([
      {name:FavorModel.name,schema:FavorShema}
    ]),
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:"./envs/.favorite.env"
    })
  ],
  controllers: [FavoriteController],
  providers: [FavoriteService],
})
export class FavoriteModule {}
