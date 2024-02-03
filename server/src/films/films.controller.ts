import { Body, Controller, Param, Post } from "@nestjs/common";
import { FilmsService } from "./films.service";
import { Users } from "src/database/app.mongo";
import { FilmsDto } from "src/dto/films.dto";

@Controller('films')
export class FilmsController {
   constructor(private readonly service:FilmsService){};

   @Post(':id')
   async addFilms(@Param('id') id:string,@Body() body:Omit<FilmsDto,"_id">):Promise<Users>{
     return await this.service.addFilm(id,body);
   };
};