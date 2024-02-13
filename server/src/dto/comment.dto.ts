import { IsNumber, IsString } from "class-validator";

export class CommentDto {
    @IsString()
    _id:string;

    @IsString()
    text:string;

    @IsNumber()
    time:number;

    @IsString()
    userId:string;
    
    @IsString()
    username:string;
}