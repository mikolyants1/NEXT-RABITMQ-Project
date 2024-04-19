import { IsString } from "class-validator";

export class JwtPayloadDto {
    @IsString()
    _id:string;

    @IsString()
    name:string;
}