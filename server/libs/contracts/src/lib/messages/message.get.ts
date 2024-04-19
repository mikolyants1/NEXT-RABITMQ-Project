import { Mess } from "@server1/models";

export namespace GetMessage {
    export const topic:string = "message.get-message.query";
    
    export class Request {}

    export class Response {
        data:Mess[]
    }
}