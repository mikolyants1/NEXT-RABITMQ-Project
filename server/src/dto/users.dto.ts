import { ApiProperty } from "@nestjs/swagger";
import { FilmsDto } from "./films.dto";
import {IsNotEmpty, IsString} from 'class-validator';

export class UsersDto {
    @ApiProperty({
     type:String
    })
    @IsString()
    _id:string;

    @ApiProperty({
      type:String
    })
    @IsString()
    @IsNotEmpty()
    name:string;

    @ApiProperty({
     type:String
    })
    @IsString()
    @IsNotEmpty()
    pass:string;
    
    @ApiProperty({
     type:[FilmsDto]
    })
    films:FilmsDto[]
}