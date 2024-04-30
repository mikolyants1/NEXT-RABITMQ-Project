import { ConfigModule, ConfigService } from '@nestjs/config';
import {MongooseModuleAsyncOptions} from '@nestjs/mongoose';

export const MongoConfig = ():MongooseModuleAsyncOptions => ({
  imports:[ConfigModule],
  inject:[ConfigService],
  useFactory:(service:ConfigService)=>{
    const login = service.get<string>("MONGO_LOGIN");
    const pass = service.get<string>("MONGO_PASSWORD");
    const host = service.get<string>("MONGO_HOST");
    const port = service.get<string>("MONGO_PORT");

    return {
      uri:`mongodb://${login}:${pass}@${host}:${port}/`
  }}
});