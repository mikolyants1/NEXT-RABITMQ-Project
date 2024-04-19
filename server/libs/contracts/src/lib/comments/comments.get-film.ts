import { CommentDto } from "@server1/apidocs"

export namespace GetFilmComments {
    export const topic:string = "comments.get-film-comments.query";
    
    export class Request {
        id:string;
    }

    export class Response {
        data:CommentDto[]
    }
}