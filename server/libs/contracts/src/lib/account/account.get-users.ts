import {Users} from '@server1/models';

export namespace GetUsers {
    export const topic = "account.get-users.query";

    export class Request {}

    export class Response {
        users:Users[]
    }
}
