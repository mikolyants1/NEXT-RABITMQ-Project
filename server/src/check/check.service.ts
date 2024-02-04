import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Users } from "src/database/app.mongo";
import { UsersDto } from "src/dto/users.dto";
import * as bc from 'bcrypt';
import { FilmsDto } from "src/dto/films.dto";
import { AuthService } from "src/auth/auth.service";

@Injectable()
export class CheckService {
    constructor(private readonly auth:AuthService,
   @InjectModel(Users.name) private readonly Base:Model<Users>){};

   async checkData(body:Omit<UsersDto,'_id'|"films">):Promise<{_id:string,token:string}>{
      const users:UsersDto[]|undefined = await this.Base.find();
      if (!users) return;
      const user:UsersDto|undefined = users.find((i:UsersDto)=>(
        i.name == body.name && bc.compare(body.pass,i.pass)
      ));
      const token:string = user ? await this.auth.create(user) : "";
      return {_id: user ? user._id : '-1',token};
   }

   async checkId(imdbID:string,id:string):Promise<boolean>{
    const user:UsersDto|undefined = await this.Base.findById(id);
    if (!user) return;
    return Boolean(user.films.find((i:FilmsDto)=>i.imdbID == imdbID));
   } 
}