import { Logger, MiddlewareConsumer, Module, NestModule, OnApplicationBootstrap, OnModuleInit } from '@nestjs/common';
import { GatewayModule } from './socket/socket.module';
import { AuthModule } from './auth/auth.module';
import { RMQConfig} from '@server1/configs';
import { MongoConfig } from '@server1/configs';
import { MongooseModule } from '@nestjs/mongoose';
import { BanModel, BanSchema, UserSchema, Users } from '@server1/models';
import { Reflector } from '@nestjs/core';
import {RMQModule} from 'nestjs-rmq';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { ConfigModule } from '@nestjs/config';
import { AccountController } from './controllers/account.controller';
import { FilmsController } from './controllers/films.controller';
import { BanController } from './controllers/ban.controller';
import { CheckController } from './controllers/check.controller';
import { FavoriteController } from './controllers/favorite.controller';
import { CommentsController } from './controllers/comments.controller';
import { MessageController } from './controllers/message.controller';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    GatewayModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:"./envs/.api.env"
    }),
    RMQModule.forRootAsync(RMQConfig()),
    MongooseModule.forRootAsync(MongoConfig()),
    MongooseModule.forFeature([
      {name:BanModel.name,schema:BanSchema},
      {name:Users.name,schema:UserSchema}
    ])
  ],
  controllers: [
    AccountController,
    FilmsController,
    BanController,
    CheckController,
    FavoriteController,
    CommentsController,
    MessageController
  ],
  providers:[
    Reflector,
    JwtStrategy
  ]
})
export class ApiModule implements NestModule,OnModuleInit,OnApplicationBootstrap {
  private readonly logger:Logger = new Logger(ApiModule.name);

  onApplicationBootstrap() {
    this.logger.log("all controllers init");
  }

  onModuleInit() {
    this.logger.log("api module init");
  }

  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(AuthMiddleware)
    .forRoutes(FilmsController)
  }
}
