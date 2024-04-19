import { Module } from '@nestjs/common';
import {MongoConfig, RMQConfig} from '@server1/configs';
import { FilmsController } from './films.controller';
import { FilmService } from './films.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, Users } from '@server1/models';
import { RMQModule } from 'nestjs-rmq';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRootAsync(MongoConfig()),
    RMQModule.forRootAsync(RMQConfig()),
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:"./envs/.films.env"
    }),
    MongooseModule.forFeature([
      {name:Users.name,schema:UserSchema}
    ])
  ],
  controllers: [FilmsController],
  providers: [FilmService],
})
export class FilmModule {}
