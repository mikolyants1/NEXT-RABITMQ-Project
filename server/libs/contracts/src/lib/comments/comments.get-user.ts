import { UpdateDto } from "@server1/apidocs"

export namespace GetUserComments {
   export const topic:string = "comments.get-user-comments.query";
    
    export class Request {
        id:string
    }

    export class Response {
      data:UpdateDto[]
    }
}