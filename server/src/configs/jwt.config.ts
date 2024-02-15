import { ConfigModule, ConfigService } from "@nestjs/config"
import { JwtModuleAsyncOptions } from "@nestjs/jwt";

export const jwtConfig = ():JwtModuleAsyncOptions => {
    return {
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:(service:ConfigService)=>({
        global:true,
        secret:service.get("SECRET"),
        signOptions:{
          expiresIn:'24h'
        }
      })
    }
};