import { Body, Controller } from '@nestjs/common';
import {RMQRoute} from 'nestjs-rmq';
import { FilmService } from './films.service';
import { ClearFilm, CreateFilm, DelFilm } from '@server1/contracts';

@Controller()
export class FilmsController {
  constructor(private readonly service:FilmService) {}

  @RMQRoute(CreateFilm.topic)
  async addFilm(@Body() {body,id}:CreateFilm.Request){
    return this.service.addFilm(id,body);
  }

  @RMQRoute(DelFilm.topic)
  async delFilm(@Body() {id,_id}:DelFilm.Request){
    return this.service.delFilm(id,_id);
  }

  @RMQRoute(ClearFilm.topic)
  async clearFilm(@Body() {id}:ClearFilm.Request){
    return this.service.clearFilm(id);
  }

}
