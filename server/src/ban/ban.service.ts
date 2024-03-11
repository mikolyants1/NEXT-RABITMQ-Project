import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BanModel } from "src/database/ban.mongo";
import { BanDto } from "src/dto/ban.dto";

@Injectable()
export class BanService {
    constructor(
      @InjectModel(BanModel.name) private readonly base:Model<BanModel>
    ){}

    async banUser(userId:string):Promise<BanModel>{
      return await new this.base({
        userId,
        banTime:Date.now()
      })
      .save();
    }

    async unBabUser(userId:string):Promise<BanModel>{
      return await this.base
      .findOneAndDelete({userId})
      .exec();
    }

    async getAllUsers():Promise<BanModel[]>{
      return await this.base.find().exec();
    }

    async checkUser(id:string):Promise<boolean>{
      const users:BanDto[] = await this.base.find();
      return users.every((i:BanDto)=>`${i.userId}` !== `${id}`);
    }
}