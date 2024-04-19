import { MessAdmin } from "@server1/apidocs";
import { Mess } from "@server1/models";

export namespace CreateMessage {
    export const topic:string = "message.create.command";
    
    export class Request {
        body:MessAdmin;
    }

    export class Response {
        data:Mess
    }
}