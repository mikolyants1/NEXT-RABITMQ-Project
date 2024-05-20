import { Injectable } from '@nestjs/common';
import {Users} from '@server1/models';
import {FilmsDto,UsersDto} from '@server1/apidocs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClearFilm, CreateFilm, DelFilm } from '@server1/contracts';

@Injectable()
export class FilmService {
  constructor(
    @InjectModel(Users.name)
    private readonly Base:Model<Users>,
  ){}

  async addFilm(id:string,body:Omit<FilmsDto,"_id">):Promise<CreateFilm.Response>{
    const user:UsersDto = await this.Base.findById(id);
    const films:Omit<FilmsDto,"_id">[] = user.films;
    films.push({...body});
    const data:Users = await this.Base
    .findByIdAndUpdate(id,{films},{new:true});
    return {data};
  }

  async delFilm(id:string,_id:string):Promise<DelFilm.Response>{
    const user:UsersDto = await this.Base.findById(id);
    const films:FilmsDto[] = user.films
    .filter((i:FilmsDto)=>i._id.toString() !== _id);
    const data = await this.Base
    .findByIdAndUpdate(id,{films},{new:true});
    return {data};
  }

  async clearFilm(id:string):Promise<ClearFilm.Response>{
    const data:Users = await this.Base
    .findByIdAndUpdate(id,{films:[]},{new:true});
    return {data};
  }
}
