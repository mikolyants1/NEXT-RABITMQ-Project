import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Comments, CommentsSchema } from '@server1/models';
import {RMQModule} from 'nestjs-rmq';
import {RMQConfig,MongoConfig} from '@server1/configs';
@Module({
  imports: [
    MongooseModule.forRootAsync(MongoConfig()),
    RMQModule.forRootAsync(RMQConfig()),
    MongooseModule.forFeature([
      {name:Comments.name,schema:CommentsSchema}
    ]),
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:"./envs/.check.env"
    })
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
