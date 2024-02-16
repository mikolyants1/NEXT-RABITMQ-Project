import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class CommentDto {
    @ApiProperty({
      type:String,
      example:"123456"
    })
    @IsString()
    _id:string;

    @ApiProperty({
      type:String,
      example:'best film'
    })
    @IsString()
    @MinLength(1)
    text:string;

    @ApiProperty({
      type:Number,
      example:Date.now()
    })
    @IsNumber()
    time:number;

    @ApiProperty({
      type:String,
      example:'12345'
    })
    @IsString()
    @IsNotEmpty()
    userId:string;
    
    @ApiProperty({
      type:String,
      example:'sergey'
    })
    @IsString()
    @MinLength(3)
    username:string;
}

export class UpdateDto extends CommentDto {
    @ApiProperty({
      type:String,
      example:"Avengers"
    })
    @IsString()
    @IsNotEmpty()
    name:string;

    @ApiProperty({
      type:String,
      example:"tt1234"
    })
    @IsString()
    @IsNotEmpty()
    filmID:string;
}