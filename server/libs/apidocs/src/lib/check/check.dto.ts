import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import {Roles} from '@server1/enums';

export class CheckDto {
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
    token:string | undefined;

    @ApiProperty({
      type:String
    })
    @IsString()
    @IsNotEmpty()
    role:Roles | string | undefined;
}