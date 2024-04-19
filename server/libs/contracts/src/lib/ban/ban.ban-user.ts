import {BanModel} from '@server1/models';

export namespace BanUser {
    export const topic:string = "ban.ban-user.commmand";
    
    export class Request {
        id:string;
    }

    export class Response {
        users:BanModel
    }
}