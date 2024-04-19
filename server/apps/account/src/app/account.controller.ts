import { Body, Controller } from '@nestjs/common';
import {RMQRoute} from 'nestjs-rmq';
import {GetUsers,GetUser,AddUser} from '@server1/contracts';
import { AccountService } from './account.service';

@Controller()
export class AccountController {
  constructor(private readonly service: AccountService) {}

  @RMQRoute(GetUsers.topic)
  async getUsers() {
    return this.service.getUsers();
  }

  @RMQRoute(GetUser.topic)
  async getUser(@Body() {id}:GetUser.Request){
    return this.service.getUser(id);
  }

  @RMQRoute(AddUser.topic)
  async addUser(@Body() {name,pass}:AddUser.Request){
    return this.service.addUser(name,pass);
  }
}
