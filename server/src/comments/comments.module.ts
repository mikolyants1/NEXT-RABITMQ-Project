import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { CommentsService } from "./comments.service";
import { CommentsController } from "./comments.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Comments, CommentsSchema } from "src/database/comments.mongo";
import { UserSchema, Users } from "src/database/user.mongo";
import { BanModel, BanSchema } from "src/database/ban.mongo";
import { Reflector } from "@nestjs/core";
import { BanModule } from "src/ban/ban.module";

@Module({
 imports:[
    AuthModule,
    BanModule,
    MongooseModule.forFeature([
     {
        name:Comments.name,
        schema:CommentsSchema
     },
     {
        name:Users.name,
        schema:UserSchema
     },
   ])
 ],
 controllers:[CommentsController],
 providers:[CommentsService,Reflector]
})
export class CommentsModule {}