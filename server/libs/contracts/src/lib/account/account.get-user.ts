import {Users} from '@server1/models';

export namespace GetUser {
    export const topic:string = "account.get-user.query";
    
    export class Request {
        id:string;
    }

    export class Response {
        users:Users
    }
}