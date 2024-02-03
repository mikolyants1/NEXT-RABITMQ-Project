import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema, Users } from "src/database/app.mongo";
import { FilmsService } from "./films.service";
import { FilmsController } from "./films.controller";
import { CheckAuthToken } from "src/middlewares/CheckAuthToken";
import { AuthService } from "src/auth.service";

@Module({
    imports:[
      MongooseModule.forFeature([
        {name:Users.name,schema:UserSchema}
      ])
    ],
    providers:[FilmsService,AuthService],
    controllers:[FilmsController]
})
export class FilmsModule implements NestModule {
   configure(consumer: MiddlewareConsumer) {
     consumer
     .apply(CheckAuthToken)
     .forRoutes({path:"films",method:RequestMethod.POST})
   }
}