import { Body, Controller, Delete, Param, Post, Query } from "@nestjs/common";
import { FilmsService } from "./films.service";
import { Users } from "src/database/user.mongo";
import { FilmsDto } from "src/dto/films.dto";
import { UsersDto } from "src/dto/users.dto";

@Controller('films')
export class FilmsController {
   constructor(private readonly service:FilmsService){};

   @Delete('clear')
   async clearFilm(@Query('filmId') id:string):Promise<Users>{
      return await this.service.clearFilm(id);
   };

   @Post(':id')
   async addFilms(@Param('id') id:string,
   @Body() body:Omit<FilmsDto,"_id">):Promise<Users>{
     return await this.service.addFilm(id,body);
   };

   @Delete('delOne')
   async delFilm(@Query('userId') id:string,
   @Query('filmId') _id:string):Promise<Users>{
    return this.service.delFilm(id,_id);
   };
};