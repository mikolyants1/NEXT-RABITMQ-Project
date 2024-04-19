import { FavorFilmDto } from "@server1/apidocs"

export namespace GetFavorite {
    export const topic:string = "favorite.get.query";
    
    export class Request {
        id:string;
    }

    export class Response {
       data:FavorFilmDto[]
    }
}