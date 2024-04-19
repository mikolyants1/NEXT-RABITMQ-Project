import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {Users} from '@server1/models';
import {FilmsDto, UserBody, UsersDto} from '@server1/apidocs';
import { Model } from "mongoose";
import * as bc from 'bcrypt';
import { Roles } from "@server1/enums";
import { CheckId, CheckUser } from "@server1/contracts";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class CheckService {
    constructor(
     private readonly jwt:JwtService,
     @InjectModel(Users.name)
     private readonly Base:Model<Users>
    ){}

   async checkData({name,pass}:UserBody):Promise<CheckUser.Response>{
      const users:UsersDto[] = await this.Base.find();
      if (!users) throw new UnauthorizedException();
      const user:UsersDto = users.find((i:UsersDto)=>(
        i.name == name && bc.compare(pass,i.pass)
      ));
      const token:string = user ? this.jwt.sign({
        _id:user._id,
        name:user.name
      }) : "";
      const role:Roles|string = user ? user.role : "";
      return {_id: user ? user._id : '-1',token,role};
   }

   async checkId(imdbID:string,id:string):Promise<CheckId.Response>{
    const user:UsersDto = await this.Base.findById(id);
    const result:boolean = user.films
    .some((i:FilmsDto)=>i.imdbID == imdbID);
    return {result};
   } 
}