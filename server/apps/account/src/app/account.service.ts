import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from '@server1/models';
import { Model } from 'mongoose';
import * as bc from 'bcrypt';
import { Roles } from '@server1/enums';
import { AddUser, GetUser, GetUsers } from '@server1/contracts';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Users.name)
    private readonly Base:Model<Users>,
    private readonly config:ConfigService,
  ){}

  async getUsers():Promise<GetUsers.Response>{
    const users:Users[] = await this.Base.find();
    return {users};
  }
  
  async getUser(id:string):Promise<GetUser.Response>{
    const users:Users = await this.Base.findById(id);
    return {users};
  }

  async addUser(name:string,pass:string):Promise<AddUser.Response>{
    const hash:string = await bc.hash(pass,10);
    const isPass:boolean = pass == this.config.get("PASSWORD");
    const isLogin:boolean = name == this.config.get("LOGIN");
    const isAdmin:boolean = isLogin && isPass;
    const users = new this.Base({
      role:isAdmin ? Roles.ADMIN : Roles.GUEST,
      pass:hash,
      films:[],
      name
    });
    await users.save();
    return {users};
  }
}
