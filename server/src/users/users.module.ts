import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema, Users } from "src/database/app.mongo";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";

@Module({
    imports:[
     MongooseModule.forFeature([
        {name:Users.name,schema:UserSchema}
     ])
    ],
    controllers:[UsersController],
    providers:[UsersService]
})
export class UsersModule {}