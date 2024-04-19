import { Module } from '@nestjs/common';
import { JwtConfig, MongoConfig, RMQConfig } from '@server1/configs';
import { CheckController } from './check.controller';
import { CheckService } from './check.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { RMQModule } from 'nestjs-rmq';
import { UserSchema, Users } from '@server1/models';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forRootAsync(MongoConfig()),
    RMQModule.forRootAsync(RMQConfig()),
    MongooseModule.forFeature([
      {name:Users.name,schema:UserSchema}
    ]),
    JwtModule.registerAsync(JwtConfig()),
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:"./envs/.check.env"
    })
  ],
  controllers: [CheckController],
  providers: [CheckService],
})
export class CheckModule {}
