import {Users} from '@server1/models';

export namespace AddUser {
    export const topic:string = "account.add.command";

    export class Request {
        name:string;
        pass:string;
    }

    export class Response {
        users:Users;
    }
}