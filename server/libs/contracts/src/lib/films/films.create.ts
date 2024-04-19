import { FilmsDto } from "@server1/apidocs";
import { Users } from "@server1/models";

export namespace CreateFilm {
    export const topic:string = "films.create.command";
    
    export class Request {
        id:string;
        body:Omit<FilmsDto,"_id">
    }

    export class Response {
        data:Users
    }
}