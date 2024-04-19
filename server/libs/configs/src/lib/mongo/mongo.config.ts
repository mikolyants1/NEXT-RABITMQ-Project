import { ConfigModule, ConfigService } from '@nestjs/config';
import {MongooseModuleAsyncOptions} from '@nestjs/mongoose';

export const MongoConfig = ():MongooseModuleAsyncOptions => ({
  imports:[ConfigModule],
  inject:[ConfigService],
  useFactory:(service:ConfigService)=>{
    return {
      uri:service.get("MONGO_URI")
  }}
})


