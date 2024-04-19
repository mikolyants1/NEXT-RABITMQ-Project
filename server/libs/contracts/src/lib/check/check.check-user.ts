import { UserBody } from "@server1/apidocs";

export namespace CheckUser {
    export const topic:string = "check.check-user.command";
    
    export class Request {
       body:UserBody
    }

    export class Response {
      _id:string;
      token:string;
      role:string
    }
}