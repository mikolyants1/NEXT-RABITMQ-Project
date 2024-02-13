import { ConfigModule, ConfigService } from "@nestjs/config"

export const mongoConfig = () => {
  return {
    imports:[ConfigModule],
    inject:[ConfigService],
    useFactory:(service:ConfigService)=>({
      uri:service.get('COMM_URI')
    })
  }
}