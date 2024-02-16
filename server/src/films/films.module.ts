import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema, Users } from "src/database/user.mongo";
import { FilmsService } from "./films.service";
import { FilmsController } from "./films.controller";
import { AuthMiddleware } from "src/middlewares/AuthMiddleware";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports:[
      MongooseModule.forFeature([
         {
          name:Users.name,
          schema:UserSchema
         }
      ]),
      AuthModule
    ],
    providers:[FilmsService],
    controllers:[FilmsController]
})
export class FilmsModule implements NestModule {
   configure(consumer: MiddlewareConsumer) {
     consumer
     .apply(AuthMiddleware)
     .forRoutes({path:"films",method:RequestMethod.ALL})
   }
}