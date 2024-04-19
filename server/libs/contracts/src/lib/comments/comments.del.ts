import { Comments } from "@server1/models"

export namespace DelComment {
    export const topic:string = "comments.delete.command";
    
    export class Request {
        id:string;
        time:number
    }

    export class Response {
        data:Comments
    }
}