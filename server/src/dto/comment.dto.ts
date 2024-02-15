import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CommentDto {
    @ApiProperty({
      type:String
    })
    @IsString()
    _id:string;

    @ApiProperty({
      type:String
    })
    @IsString()
    text:string;

    @ApiProperty({
      type:Number
    })
    @IsNumber()
    time:number;

    @ApiProperty({
      type:String
    })
    @IsString()
    userId:string;
    
    @ApiProperty({
      type:String
    })
    @IsString()
    username:string;
}

export class UpdateDto extends CommentDto {
    @ApiProperty({
      type:String
    })
    @IsString()
    name:string;

    @ApiProperty({
      type:String
    })
    @IsString()
    filmID:string
}