import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {ConfigModule} from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { FilmsModule } from './films/films.module';
import { CheckModule } from './check/check.module';
import {JwtModule} from '@nestjs/jwt';
import { CommentsModule } from './comments/comments.module';
import { mongoConfig } from './configs/mongo.config';
import { jwtConfig } from './configs/jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:'./src/.db.env'
    }),
    MongooseModule.forRootAsync(mongoConfig()),
    CommentsModule,
    UsersModule,
    FilmsModule,
    CheckModule,
  ],
})
export class AppModule {}
