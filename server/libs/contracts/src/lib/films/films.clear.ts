import { Users } from "@server1/models"

export namespace ClearFilm {
    export const topic:string = "films.clear.command";
    
    export class Request {
        id:string;
    }

    export class Response {
        data:Users
    }
}