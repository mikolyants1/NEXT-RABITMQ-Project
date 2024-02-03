import { IsString } from "class-validator";

export class FilmsDto {
    @IsString()
    _id:string;

    @IsString()
    imdbID:string;

    @IsString()
    Title:string;

    @IsString()
    Released:string;
    
    @IsString()
    Actors:string;

    @IsString()
    Director:string;

    @IsString()
    Poster:string;

    @IsString()
    Plot:string
}