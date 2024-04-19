import { Logger } from '@nestjs/common';
import {WebSocketGateway,WebSocketServer,OnGatewayDisconnect,
 SubscribeMessage, MessageBody, OnGatewayInit} from '@nestjs/websockets';
import {Server} from 'socket.io';

@WebSocketGateway({cors:{origin:"*"}})
export class Gateway implements OnGatewayDisconnect,OnGatewayInit {
  @WebSocketServer() private server:Server;
  private current:string = "";
  private users:string[] = [];

  afterInit(server:Server) {
    Logger.log("socket works",server);
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
    if (!this.users.some((i:string)=> i == id)){
      this.users.push(id);
    }
    this.current = id;
  }

  delUserId():void{
    this.users = this.users.filter((i:string)=>(
      i !== this.current
    ))
  }
}