import { ApiProperty } from "@nestjs/swagger";
import { FilmsDto } from "./films.dto";
import {IsArray, IsString, MinLength} from 'class-validator';
import { Roles } from "@server1/enums";
import { PickType} from '@nestjs/mapped-types';

export class UsersDto {
    @ApiProperty({
    type: String
  })
  @IsString()
  _id: string;

    @ApiProperty({
    type: String
  })
  @IsString()
  @MinLength(1)
  name: string;

  @ApiProperty({
    type: String
  })
  @IsString()
  @MinLength(1)
  pass: string;
    
    @ApiProperty({
    type: String
  })
  @IsString()
  role: Roles;

    @ApiProperty({
    type: [FilmsDto]
  })
  @IsArray()
  films: FilmsDto[];
}

export class AuthUser extends PickType(UsersDto,["_id","name"] as const){}

export class UserBody extends PickType(UsersDto,["name","pass"] as const){}