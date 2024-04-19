import { UpdateDto } from "@server1/apidocs";
import { Comments } from "@server1/models";

export namespace CreateComment {
   export const topic:string = "comments.create-comments.command";
    
   export class Request {
      id:string;
      body:Omit<UpdateDto,"filmID">
   }

   export class Response {
      data:Comments
   }
}