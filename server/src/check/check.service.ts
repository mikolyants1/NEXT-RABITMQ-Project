import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Users } from "src/database/user.mongo";
import { UsersDto } from "src/dto/users.dto";
import * as bc from 'bcrypt';
import { FilmsDto } from "src/dto/films.dto";
import { AuthService } from "src/auth/auth.service";
import { CheckDto } from "src/dto/check.dto";
import { ConfigService } from "@nestjs/config";
import { Roles } from "src/enums/role.enum";

@Injectable()
export class CheckService {
    constructor(
     private readonly auth:AuthService,
     private readonly config:ConfigService,
     @InjectModel(Users.name) private readonly Base:Model<Users>
    ){};

   async checkData(body:Omit<UsersDto,'_id'|"films">):Promise<CheckDto>{
      const users:UsersDto[] = await this.Base.find();
      if (!users) throw new UnauthorizedException();
      const user:UsersDto = users.find((i:UsersDto)=>(
        i.name == body.name && bc.compare(body.pass,i.pass)
      ));
      const token:string = user ? this.auth.create(user) : "";
      const role:string = user ? user.role : "";
      return {_id: user ? user._id : '-1',token,role};
   }

   async checkId(imdbID:string,id:string):Promise<boolean>{
    const user:UsersDto = await this.Base.findById(id);
    return user.films.some((i:FilmsDto)=>i.imdbID == imdbID);
   } 
}