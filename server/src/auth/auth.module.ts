import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CheckAuthToken } from "src/middlewares/CheckAuthToken";

@Module({
    providers:[AuthService],
    exports:[AuthService]
})
export class AuthModule {}