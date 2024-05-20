import { Module } from '@nestjs/common';
import {MongoConfig, RMQConfig} from '@server1/configs';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserSchema, Users } from '@server1/models';
import { RMQModule } from 'nestjs-rmq';
import {getEnv} from '@server1/methods';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:getEnv('account')
    }),
    MongooseModule.forRootAsync(MongoConfig()),
    RMQModule.forRootAsync(RMQConfig()),
    MongooseModule.forFeature([
      {name:Users.name,schema:UserSchema}
    ])
  ],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
