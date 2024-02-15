import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { jwtConfig } from "src/configs/jwt.config";

@Module({
    imports:[
      JwtModule.registerAsync(jwtConfig())
    ],
    providers:[AuthService],
    exports:[AuthService]
})
export class AuthModule {}