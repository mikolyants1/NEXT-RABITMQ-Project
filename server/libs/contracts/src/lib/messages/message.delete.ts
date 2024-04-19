import { Mess } from "@server1/models"

export namespace DelMessage {
   export const topic:string = "message.delete.command";
    
   export class Request {
      id:string;
   }

   export class Response {
      data:Mess
   }
}