import { OmitType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";
import { FilmsDto } from "../account/films.dto";
import { FavoriteType } from "@server1/enums";

export class FavorFilmDto extends OmitType(FilmsDto,["Plot","Director","Actors","imdbID"] as const) {
    @ApiProperty({
      type:String
    })
    @IsString()
    @IsNotEmpty()
    filmId:string;
}

export class FavorBodyFilm extends FavorFilmDto {
  @IsNotEmpty()
  type:FavoriteType
}