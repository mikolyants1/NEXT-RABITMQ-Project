import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {ConfigModule} from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { FilmsModule } from './films/films.module';
import { CheckModule } from './check/check.module';
import { CommentsModule } from './comments/comments.module';
import { mongoConfig } from './configs/mongo.config';
import { GatewayModule } from './socket/socket.module';
import { MessModule } from './mess/mess.module';
import { BanModule } from './ban/ban.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:[
        './src/.db.env',
        './src/.admin.env'
      ]
    }),
    MongooseModule.forRootAsync(mongoConfig()),
    MessModule,
    BanModule,
    CommentsModule,
    GatewayModule,
    UsersModule,
    FilmsModule,
    CheckModule,
  ],
})
export class AppModule {}
