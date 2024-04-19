import { FilmsDto } from '@server1/apidocs';

export namespace CheckId {
    export const topic:string = "check.check-id.command";
    
    export class Request {
       id:string;
       body:Pick<FilmsDto,"imdbID">
    }

    export class Response {
        result:boolean
    }
}