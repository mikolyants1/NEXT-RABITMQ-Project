import { Injectable } from '@nestjs/common';
import { FavorDto, FavorFilmDto } from '@server1/apidocs';
import { FavoriteCreate, FavoriteDelete, GetFavorite } from '@server1/contracts';
import { InjectModel } from '@nestjs/mongoose';
import { FavorModel } from '@server1/models';
import { Model } from 'mongoose';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectModel(FavorModel.name)
    private readonly favor:Model<FavorModel>
  ){}

  async addFavor(userId:string,film:FavorFilmDto):Promise<FavoriteCreate.Response>{
    const user:FavorDto = await this.favor.findOne({userId});
    if (user){
      const films:FavorFilmDto[] = user.films;
      films.push({...film});
      const data:FavorDto = await this.favor
      .findOneAndUpdate({id:userId},{films},{new:true}).exec();
      return {data};
    } else {
      const data = new FavorModel({userId,films:[film]});
      await data.save();
      return {data};
    }
  }
  async delFromFavor(userId:string,filmId:string):Promise<FavoriteDelete.Response>{
    const favor:FavorDto = await this.favor.findOne({userId});
    const films:FavorFilmDto[] = favor.films
    .filter((i:FavorFilmDto)=>i.filmId.toString() !== filmId);
    const data:FavorDto = await this.favor
    .findByIdAndUpdate({userId},{films},{new:true})
    return {data};
  }

  async getFavor(userId:string):Promise<GetFavorite.Response>{
   const user:FavorDto = await this.favor.findOne({userId});
   return {data:user ? user.films : []};
  }

}
