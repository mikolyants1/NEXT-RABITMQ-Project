import { Module } from "@nestjs/common";
import { BanController } from "./ban.controller";
import { BanService } from "./ban.service";
import { MongooseModule } from "@nestjs/mongoose";
import { BanModel, BanSchema } from "src/database/ban.mongo";
import { AuthModule } from "src/auth/auth.module";
import { UserSchema, Users } from "src/database/user.mongo";
import { Reflector } from "@nestjs/core";


@Module({
  imports:[
    AuthModule,
    MongooseModule.forFeature([
        {
            name:BanModel.name,
            schema:BanSchema
        },
        {
            name:Users.name,
            schema:UserSchema
        }
    ])
  ],
  controllers:[BanController],
  providers:[BanService,Reflector],
  exports:[BanService]
})
export class BanModule {}