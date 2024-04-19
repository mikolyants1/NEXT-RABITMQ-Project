import { Body, Controller} from '@nestjs/common';
import { BanService } from './ban.service';
import { RMQRoute } from 'nestjs-rmq';
import { BanUser, GetBanUsers, UnbanUser } from '@server1/contracts';

@Controller()
export class BanController {
  constructor(private readonly service: BanService) {}

  @RMQRoute(BanUser.topic)
  async banUser(@Body() {id}:BanUser.Request){
    return this.service.banUser(id);
  }

  @RMQRoute(UnbanUser.topic)
  async unbanUser(@Body() {id}:UnbanUser.Request){
    return this.service.unBabUser(id);
  }

  @RMQRoute(GetBanUsers.topic)
  async getAllUsers(){
    return this.service.getAllUsers();
  }
}
