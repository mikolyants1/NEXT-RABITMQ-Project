import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service"
import { UsersController } from "./users.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema, Users } from "src/database/user.mongo";

describe("test user service",()=>{
    let service:UsersService;
    beforeEach(async () => {
      const app:TestingModule = await Test.createTestingModule({
         imports:[
            MongooseModule.forFeature([
                {
                  name:Users.name,
                  schema:UserSchema
                }
            ])
         ],
         controllers:[UsersController],
         providers:[UsersService]
      }).compile();

      service = app.get<UsersService>(UsersService);
    });

    describe("service",()=>{
       it("add user",async ()=>{
          expect(service.addUser({
            name:"dima",
            pass:"red"
          })
          .then((d:Users)=>d.name))
          .toBe("dima")
       })
    })
})