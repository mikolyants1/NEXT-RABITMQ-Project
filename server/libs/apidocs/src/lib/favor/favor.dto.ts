import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { FavorFilmDto } from "./favorFilm.dto";

export class FavorDto {
    @ApiProperty({
      type:String
    })
    @IsString()
    @IsNotEmpty()
    _id:string;

    @ApiProperty({
     type:String
    })
    @IsString()
    @IsNotEmpty()
    userId:string;

    @ApiProperty({
      type:[FavorFilmDto]
    })
    @IsArray()
    films:FavorFilmDto[];
}
