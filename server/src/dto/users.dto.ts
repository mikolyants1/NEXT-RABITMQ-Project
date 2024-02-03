import { FilmsDto } from "./films.dto";
import {IsString} from 'class-validator';

export class UsersDto {
    @IsString()
    _id:string;

    @IsString()
    name:string;

    @IsString()
    pass:string;
    
    films:FilmsDto[]
}