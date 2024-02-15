import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class FilmsDto {
    @ApiProperty({
     type:String
    })
    @IsString()
    _id:string;

    @ApiProperty({
     type:String
    })
    @IsString()
    imdbID:string;

    @ApiProperty({
     type:String
    })
    @IsString()
    Title:string;

    @ApiProperty({
     type:String
    })
    @IsString()
    Released:string;
    
    @ApiProperty({
     type:String
    })
    @IsString()
    Actors:string;

    @ApiProperty({
     type:String
    })
    @IsString()
    Director:string;

    @ApiProperty({
     type:String
    })
    @IsString()
    Poster:string;

    @ApiProperty({
     type:String
    })
    @IsString()
    Plot:string
}