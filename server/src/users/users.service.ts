import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Users } from "src/database/user.mongo";
import * as bc from 'bcrypt';
import { Roles } from "src/enums/role.enum";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private readonly Base:Model<Users>,
    private readonly config:ConfigService
  ){};

  async getUsers():Promise<Users[]>{
    return await this.Base.find().exec();
  };
  
  async getUser(id:string):Promise<Users>{
    return await this.Base.findById(id).exec();
  }

  async addUser(name:string,pass:string):Promise<Users>{
    const hash:string = await bc.hash(pass,10);
    const isPass:boolean = pass == this.config.get("PASSWORD");
    const isLogin:boolean = name == this.config.get("LOGIN");
    const isAdmin:boolean = isLogin && isPass;
    return await new this.Base({
      role:Roles[isAdmin ? "ADMIN" : "GUEST"],
      pass:hash,
      films:[],
      name
    }).save();
  };
}