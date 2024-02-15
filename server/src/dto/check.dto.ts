import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

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
    token:string
}