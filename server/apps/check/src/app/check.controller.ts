import { Body, Controller } from '@nestjs/common';
import { CheckService } from './check.service';
import {CheckUser,CheckId} from '@server1/contracts';
import { RMQRoute } from 'nestjs-rmq';

@Controller()
export class CheckController {
  constructor(private readonly service: CheckService){}

   @RMQRoute(CheckUser.topic)
   async checkData(@Body() {body}:CheckUser.Request){
     return this.service.checkData(body);
   }

   @RMQRoute(CheckId.topic)
   async checkId(@Body() {id,body}:CheckId.Request){
     return this.service.checkId(body.imdbID,id);
   } 
}
