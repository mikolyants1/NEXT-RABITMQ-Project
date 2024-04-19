import {ConfigService,ConfigModule} from '@nestjs/config';
import {JwtModuleAsyncOptions} from '@nestjs/jwt';

export const JwtConfig = ():JwtModuleAsyncOptions => ({
   imports:[ConfigModule],
   inject:[ConfigService],
   useFactory:(service:ConfigService)=>({
      secret:service.get("JWT_SECRET"),
      signOptions:{
        expiresIn:"24h"
      }
   })
})