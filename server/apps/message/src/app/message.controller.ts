import { Body, Controller} from '@nestjs/common';

import { MessageService } from './message.service';
import { RMQRoute } from 'nestjs-rmq';
import { CreateMessage, DelMessage, GetMessage } from '@server1/contracts';

@Controller()
export class MessageController {
  constructor(private readonly service:MessageService){}

   @RMQRoute(CreateMessage.topic)
   async createMess(@Body() {body}:CreateMessage.Request){
      return this.service.addMess(body);
   }

   @RMQRoute(DelMessage.topic)
   async deleteMess(@Body() {id}:DelMessage.Request){
     return this.service.delMess(id);
   }

   @RMQRoute(GetMessage.topic)
   async getMess(){
     return this.service.getAllMess();
   }
}
