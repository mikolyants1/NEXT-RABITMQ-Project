import { Injectable } from '@nestjs/common';
import { BanModel } from '@server1/models';
import {BanUser,GetBanUsers} from '@server1/contracts';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BanService {
  constructor(
    @InjectModel(BanModel.name)
    private readonly base:Model<BanModel>
  ){}

  async banUser(userId:string):Promise<BanUser.Response>{
    const users = new this.base({
      userId,
      banTime:Date.now()
    })
    await users.save();
    return {users};
  }

  async unBabUser(userId:string):Promise<BanUser.Response>{
    const users:BanModel = await this.base
    .findOneAndDelete({userId});
    return {users};
  }

  async getAllUsers():Promise<GetBanUsers.Response>{
    const users:BanModel[] = await this.base.find();
    return {users};
  }
}
