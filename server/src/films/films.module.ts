import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema, Users } from "src/database/app.mongo";
import { FilmsService } from "./films.service";
import { FilmsController } from "./films.controller";

@Module({
    imports:[
      MongooseModule.forFeature([
        {name:Users.name,schema:UserSchema}
      ])
    ],
    providers:[FilmsService],
    controllers:[FilmsController]
})
export class FilmsModule {}