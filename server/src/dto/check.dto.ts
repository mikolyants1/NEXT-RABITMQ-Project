import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { Roles } from "src/enums/role.enum";

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
    token:string;

    @ApiProperty({
      type:String
    })
    @IsString()
    @IsNotEmpty()
    role:string;
}