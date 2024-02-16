import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

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
    @IsNotEmpty()
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
    @IsNotEmpty()
    Actors:string;

    @ApiProperty({
     type:String
    })
    @IsString()
    @IsNotEmpty()
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
    @IsNotEmpty()
    Plot:string
}