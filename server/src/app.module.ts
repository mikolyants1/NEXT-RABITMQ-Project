import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {ConfigModule} from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { FilmsModule } from './films/films.module';
import { CheckModule } from './check/check.module';
import {JwtModule} from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:'./src/.db.env'
    }),
    JwtModule.register({
      global:true,
      secret:process.env.SECRET,
      signOptions:{
        expiresIn:'24h'
      }
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    UsersModule,
    FilmsModule,
    CheckModule,
  ],
})
export class AppModule {}
