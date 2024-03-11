
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, MinLength } from "class-validator";

export class MessDto {
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
    text:string;

    @ApiProperty({
     type:String
    })
    @IsString()
    @MinLength(1)
    description:string;

    @ApiProperty({
     type:String
    })
    @IsString()
    user:string;
    
    @ApiProperty({
     type:Number
    })
    @IsNumber()
    time:number
}
