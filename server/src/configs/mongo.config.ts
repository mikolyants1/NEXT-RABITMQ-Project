import { ConfigModule, ConfigService } from "@nestjs/config"
import { MongooseModuleAsyncOptions } from "@nestjs/mongoose"

export const mongoConfig = ():MongooseModuleAsyncOptions => {
  return {
    imports:[ConfigModule],
    inject:[ConfigService],
    useFactory:(service:ConfigService)=>({
      uri:service.get('DB_URI')
    })
  }
}