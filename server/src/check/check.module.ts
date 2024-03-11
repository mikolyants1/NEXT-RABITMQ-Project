import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema, Users } from "src/database/user.mongo";
import { CheckService } from "./check.service";
import { CheckController } from "./check.controller";
import { AuthModule } from "src/auth/auth.module";
import { Reflector } from "@nestjs/core";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports:[
        MongooseModule.forFeature([
          {
            name:Users.name,
            schema:UserSchema
          }
        ]),
        AuthModule,
        ConfigModule
    ],
    providers:[CheckService,Reflector],
    controllers:[CheckController]
})
export class CheckModule {}