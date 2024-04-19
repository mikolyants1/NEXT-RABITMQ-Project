import { FavorFilmDto } from "@server1/apidocs";
import { FavorModel } from "@server1/models";

export namespace FavoriteCreate {
    export const topic:string = "favorite.create.command";
    
    export class Request {
       userId:string;
       film:FavorFilmDto
    }

    export class Response {
        data:FavorModel
    }
}