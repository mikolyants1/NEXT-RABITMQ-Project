import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
import { BanType } from "src/enums/ban.enum";

export class BanDto {
    @ApiProperty({
      type:String
    })
    @IsString()
    _id:string;

    @ApiProperty({
      type:String
    })
    @IsString()
    userId:string;

    @ApiProperty({
      type:String
    })
    @IsNumber()
    banTime:number
}

export class BanDtoBody {
  @ApiProperty({
    type:String
  })
  @IsString()
  id:string;
  
  @ApiProperty({
    type:String
  })
  @IsString()
  type:BanType;
}