import { Body, Controller, Param, Post } from "@nestjs/common";
import { CheckService } from "./check.service";
import { UsersDto } from "src/dto/users.dto";
import { FilmsDto } from "src/dto/films.dto";

@Controller('check')
export class CheckController {
  constructor(private readonly service:CheckService){};

  @Post()
  async checkData(@Body() body:Omit<UsersDto,"_id"|"films">):Promise<{_id:string}>{
     return await this.service.checkData(body);
  }

  @Post(':id')
  async checkId(@Param('id') id:string,
  @Body() body:Pick<FilmsDto,"imdbID">):Promise<boolean>{
     return this.service.checkId(body.imdbID,id);
  };
}