import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Mess } from "src/database/mess.mongo";
import { MessDto } from "src/dto/mess.dto";

@Injectable()
export class MessService {
    constructor(
      @InjectModel(Mess.name) private readonly Base:Model<Mess>
    ){}

    async addMess(body:Omit<MessDto,"_id"|"time">):Promise<Mess>{
      return await new this.Base({
        text:body.text,
        description:body.description,
        user:body.user,
        time:Date.now()
      })
      .save();
    };

    async delMess(id:string):Promise<Mess>{
      return await this.Base
      .findByIdAndDelete(id)
      .exec();
    };

    async getAllMess():Promise<Mess[]>{
      return await this.Base.find().exec()
    }
}