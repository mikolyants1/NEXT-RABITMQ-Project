import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersDto } from "src/dto/users.dto";
import { Users } from "src/database/app.mongo";

@Controller('users')
export class UsersController {
  constructor(private readonly userService:UsersService){};

  @Get()
  async getUsers():Promise<Users[]>{
   return await this.userService.getUsers();
  };

  @Get(':id')
  async getUser(@Param('id') id:string):Promise<Users>{
    return await this.userService.getUser(id);
  };

  @Post()
  async addUser(@Body() body:Omit<UsersDto,"_id"|"films">):Promise<Users>{
    return await this.userService.addUser(body);
  }
}