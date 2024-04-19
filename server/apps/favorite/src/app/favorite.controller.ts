import { Body, Controller } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { RMQRoute } from 'nestjs-rmq';
import { FavoriteCreate, FavoriteDelete, GetFavorite } from '@server1/contracts';

@Controller()
export class FavoriteController {
  constructor(private readonly service: FavoriteService) {}

  @RMQRoute(GetFavorite.topic)
  getFavorite(@Body() {id}:GetFavorite.Request) {
    return this.service.getFavor(id);
  }

  @RMQRoute(FavoriteCreate.topic)
  createFavorite(@Body() {userId,film}:FavoriteCreate.Request){
    return this.service.addFavor(userId,film);
  }

  @RMQRoute(FavoriteDelete.topic)
  deleteFavorite(@Body() {userId,filmId}:FavoriteDelete.Request){
    return this.service.delFromFavor(userId,filmId);
  }
}
