import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema, Users } from "src/database/app.mongo";
import { CheckService } from "./check.service";
import { CheckController } from "./check.controller";
import { AuthService } from "src/auth.service";

@Module({
    imports:[
        MongooseModule.forFeature([
          {name:Users.name,schema:UserSchema}
        ])
    ],
    providers:[CheckService,AuthService],
    controllers:[CheckController]
})
export class CheckModule {}