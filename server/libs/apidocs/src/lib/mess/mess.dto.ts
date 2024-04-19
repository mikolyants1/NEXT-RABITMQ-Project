
import { OmitType } from "@nestjs/mapped-types";
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

export class MessAdmin extends OmitType(MessDto,["_id","time"] as const){}