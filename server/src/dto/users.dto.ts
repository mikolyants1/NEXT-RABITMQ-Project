import { FilmsDto } from "./films.dto";
import {IsNotEmpty, IsString} from 'class-validator';

export class UsersDto {
    @IsString()
    _id:string;

    @IsString()
    @IsNotEmpty()
    name:string;

    @IsString()
    @IsNotEmpty()
    pass:string;
    
    films:FilmsDto[]
}