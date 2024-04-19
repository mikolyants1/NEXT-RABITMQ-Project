import { Users } from "@server1/models";

export namespace DelFilm {
  export const topic:string = "films.delete.command";
    
  export class Request {
    id:string;
    _id:string
  } 

  export class Response {
    data:Users
  }
}