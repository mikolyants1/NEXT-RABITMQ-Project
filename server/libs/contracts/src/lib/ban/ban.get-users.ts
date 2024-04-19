import {BanModel} from '@server1/models';

export namespace GetBanUsers {
    export const topic:string = "ban.get-user.query";
    
    export class Request {}

    export class Response {
        users:BanModel[]
    }
}