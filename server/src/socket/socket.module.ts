import { Module } from "@nestjs/common";
import { Gateway } from "./socket.gateway";

@Module({
    providers:[Gateway]
})
export class GatewayModule {}