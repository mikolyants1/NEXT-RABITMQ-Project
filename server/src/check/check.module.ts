import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema, Users } from "src/database/app.mongo";
import { CheckService } from "./check.service";
import { CheckController } from "./check.controller";

@Module({
    imports:[
        MongooseModule.forFeature([
            {name:Users.name,schema:UserSchema}
        ])
    ],
    providers:[CheckService],
    controllers:[CheckController]
})
export class CheckModule {}