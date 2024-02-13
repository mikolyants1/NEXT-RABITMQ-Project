import { IsString } from "class-validator";
import { CommentDto } from "./comment.dto";

export class CommentsDto {
    @IsString()
    _id:string;

    @IsString()
    name:string;

    @IsString()
    filmID:string;
    
    comm:CommentDto[]
}