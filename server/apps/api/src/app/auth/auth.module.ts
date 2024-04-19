import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import {JwtConfig} from '@server1/configs';

@Module({
    imports:[
      JwtModule.registerAsync(JwtConfig())
    ],
    providers:[AuthService],
    exports:[AuthService]
})
export class AuthModule {}