import { Logger } from '@nestjs/common';
import {WebSocketGateway,WebSocketServer,OnGatewayDisconnect,
 SubscribeMessage, MessageBody, OnGatewayInit} from '@nestjs/websockets';
import {Server} from 'socket.io';

@WebSocketGateway({cors:{origin:"*"}})
export class Gateway implements OnGatewayDisconnect,OnGatewayInit {
  @WebSocketServer() private server:Server;
  private users:string[] = [];
  private current = "";
  
  afterInit(server:Server) {
    const logger = new Logger(Gateway.name);
    logger.log("socket works",server);
  }

  handleDisconnect() {
    this.delUserId();
    this.server.emit("online",this.users)
  }

  @SubscribeMessage("join")
  handleJoin(@MessageBody() id:string):void {
    this.addUserId(id);
    this.server.emit("online",this.users)
  }

  addUserId(id:string):void {
    if (!this.users.some(u => u == id)){
      this.users.push(id);
    }
    this.current = id;
  }

  delUserId():void{
    this.users = this.users.filter(u => (
      u !== this.current
    ));
  }
}