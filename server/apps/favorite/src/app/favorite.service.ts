import { Injectable } from '@nestjs/common';
import { FavorDto, FavorFilmDto } from '@server1/apidocs';
import { FavoriteCreate, FavoriteDelete, GetFavorite } from '@server1/contracts';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Redis } from 'ioredis';

@Injectable()
export class FavoriteService {
  constructor(@InjectRedis() private readonly redis:Redis){}

  async addFavor(userId:string,film:FavorFilmDto):Promise<FavoriteCreate.Response>{
    const favorite:FavorDto[] = await this.getFavorite();
    const user:FavorDto = favorite.find((u:FavorDto) => u.userId == userId);
    if (user){
      const films:FavorFilmDto[] = user.films;
      films.push({...film});
      const data:FavorDto[] = favorite.map((u:FavorDto) => (
        u.userId == userId ? {userId,films} : u
      ));
      await this.redis.set("favorite",JSON.stringify({data}));
      return {data:{userId,films}};
    } else {
      favorite.push({userId,films:[film]})
      await this.redis.set("favorite",JSON.stringify({
        data:favorite
      }))
      return {data:{userId,films:[film]}};
    }
  }
  async delFromFavor(userId:string,filmId:string):Promise<FavoriteDelete.Response>{
    const favorite:FavorDto[] = await this.getFavorite();
    const favor:FavorDto = favorite.find((u:FavorDto) => u.userId == userId);
    const films:FavorFilmDto[] = favor.films
    .filter((i:FavorFilmDto)=>i.filmId.toString() !== filmId);
    const updateFavor:FavorDto[] = favorite.map((u:FavorDto) => (
       u.userId == userId ? {userId,films} : u
    ));
    await this.redis.set("favorite",JSON.stringify({
      data:updateFavor
    }));
    return {data:{userId,films}};
  }

  async getFavor(userId:string):Promise<GetFavorite.Response>{
   const data:FavorDto[] = await this.getFavorite();
   const user:FavorDto = data.find(u => u.userId == userId);
   return {data:user ? user.films : []};
  }

  async getFavorite():Promise<FavorDto[]>{
    let data = await this.redis.get("favorite");
    if (!data){
      data = await this.redis.set("favorite",JSON.stringify({data:[]}));
    }
    const parseData = JSON.parse(data) as {data:FavorDto[]};
    return parseData.data;
  }
}
