import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Users } from "src/database/user.mongo";
import { UsersDto } from "src/dto/users.dto";
import * as bc from 'bcrypt';

@Injectable()
export class UsersService {
 constructor(@InjectModel(Users.name) private readonly Base:Model<Users>){};

  async getUsers():Promise<Users[]>{
    return await this.Base.find().exec();
  };
  
  async getUser(id:string):Promise<Users>{
    return await this.Base.findById(id).exec();
  }

  async addUser(body:Omit<UsersDto,"_id"|'films'>):Promise<Users>{
    const hash:string = await bc.hash(body.pass,10);
    return await new this.Base({name:body.name,pass:hash,films:[]}).save();
  };
}