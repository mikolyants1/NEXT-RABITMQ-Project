import { ApiProperty } from "@nestjs/swagger";
import { FilmsDto } from "./films.dto";
import {IsArray, IsString, MinLength} from 'class-validator';
import { Roles } from "src/enums/role.enum";

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
    @MinLength(1)
    name:string;

    @ApiProperty({
     type:String
    })
    @IsString()
    @MinLength(1)
    pass:string;
    
    @ApiProperty({
      type:String
    })
    @IsString()
    role:Roles;

    @ApiProperty({
     type:[FilmsDto]
    })
    @IsArray()
    films:FilmsDto[]
}