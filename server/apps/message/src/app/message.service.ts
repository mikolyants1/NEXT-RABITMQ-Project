import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MessAdmin } from '@server1/apidocs';
import { CreateMessage, DelMessage, GetMessage } from '@server1/contracts';
import { Mess } from '@server1/models';
import { Model } from 'mongoose';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Mess.name)
    private readonly Base:Model<Mess>
  ){}

  async addMess(body:MessAdmin):Promise<CreateMessage.Response>{
    const data:Mess = new this.Base({
      text:body.text,
      description:body.description,
      user:body.user,
      time:Date.now()
    });
    await data.save();
    return {data};
  }

  async delMess(id:string):Promise<DelMessage.Response>{
    const data:Mess = await this.Base
    .findByIdAndDelete(id);
    return {data};
  }

  async getAllMess():Promise<GetMessage.Response>{
    const data:Mess[] = await this.Base.find();
    return {data};
  }
}
