import { Module } from "@nestjs/common";
import { MessController } from "./Mess.controller";
import { MessService } from "./mess.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Mess, MessSchema } from "src/database/mess.mongo";
import { AuthModule } from "src/auth/auth.module";
import { UserSchema, Users } from "src/database/user.mongo";
import { Reflector } from "@nestjs/core";

@Module({
  imports:[
    AuthModule,
    MongooseModule.forFeature([
        {
            name:Mess.name,
            schema:MessSchema
        },
        {
            name:Users.name,
            schema:UserSchema
        }
    ])
  ],
  controllers:[MessController],
  providers:[MessService,Reflector]
})
export class MessModule {}