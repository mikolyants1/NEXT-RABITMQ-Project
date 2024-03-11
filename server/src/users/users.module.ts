import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema, Users } from "src/database/user.mongo";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports:[
     ConfigModule,
     MongooseModule.forFeature([
        { 
         name:Users.name,
         schema:UserSchema
        }
     ])
    ],
    controllers:[UsersController],
    providers:[UsersService]
})
export class UsersModule {}