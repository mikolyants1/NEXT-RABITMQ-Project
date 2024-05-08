import {RedisModuleAsyncOptions} from '@nestjs-modules/ioredis';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const RedisConfig = ():RedisModuleAsyncOptions => ({
   imports:[ConfigModule],
   inject:[ConfigService],
   useFactory:(service:ConfigService) => {
     const host = service.get<string>("REDIS_HOST");
     const port = service.get<string>("REDIS_PORT");
     const password = service.get<string>("REDIS_PASSWORD");

     return {
       type:"single",
       url:`redis://:${password}@${host}:${port}`,
     }
   }
});