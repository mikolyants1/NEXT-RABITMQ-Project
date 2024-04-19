import { BanModel } from "@server1/models";

export namespace UnbanUser {
    export const topic:string = "ban.unban-user.command";
    
    export class Request {
        id:string;
    }

    export class Response {
        users:BanModel
    }
}