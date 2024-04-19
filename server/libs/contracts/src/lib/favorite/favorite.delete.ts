import { FavorModel } from "@server1/models";

export namespace FavoriteDelete {
    export const topic:string = "favorite.delete.command";

    export class Request {
        userId:string;
        filmId:string;
    }

    export class Response {
       data:FavorModel
    }
}