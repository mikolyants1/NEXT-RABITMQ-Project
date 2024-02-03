import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Users } from "src/database/app.mongo";
import { FilmsDto } from "src/dto/films.dto";
import { UsersDto } from "src/dto/users.dto";

@Injectable()
export class FilmsService {
  constructor(@InjectModel(Users.name) private readonly Base:Model<Users>){};

  async addFilm(id:string,body:Omit<FilmsDto,"_id">):Promise<Users>{
    const user:UsersDto|undefined = await this.Base.findById(id);
    if (!user) return;
    const films:Omit<FilmsDto,"_id">[] = user.films;
    films.push({...body});
    return await this.Base
    .findByIdAndUpdate(id,{films},{new:true})
    .exec();
  }
}