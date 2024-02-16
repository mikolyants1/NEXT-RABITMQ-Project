import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { CommentsService } from "./comments.service";
import { CommentsController } from "./comments.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Comments, CommentsSchema } from "src/database/comments.mongo";
import { UserSchema, Users } from "src/database/user.mongo";

@Module({
 imports:[
    AuthModule,
    MongooseModule.forFeature([
     {
        name:Comments.name,
        schema:CommentsSchema
     },
     {
        name:Users.name,
        schema:UserSchema
     }
   ])
 ],
 controllers:[CommentsController],
 providers:[CommentsService]
})
export class CommentsModule {}