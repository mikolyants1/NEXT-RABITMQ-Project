import { Body, Controller, Param, Post } from "@nestjs/common";
import { CheckService } from "./check.service";
import { UsersDto } from "src/dto/users.dto";
import { FilmsDto } from "src/dto/films.dto";
import {ApiBadRequestResponse, ApiBody, ApiInternalServerErrorResponse, ApiNotFoundResponse,
ApiOkResponse,ApiOperation, ApiParam, ApiTags, OmitType, PickType,} from '@nestjs/swagger';
import { CheckDto } from "src/dto/check.dto";

@ApiTags('check correct data')
@Controller('check')
export class CheckController {
  constructor(private readonly service:CheckService){};

  @ApiOperation({
    summary:'check user',
    description:'check user data'
  })
  @ApiNotFoundResponse({
    status:404,
    schema:{
      type:"object",
      example:{
         statusCode:404,
         message:"not found"
      }
    },
    description:'path is inccorect'
  })
  @ApiOkResponse({
    status:200,
    type:CheckDto,
    description:'data verify success'
  })
  @ApiBadRequestResponse({
    status:400,
    schema:{
       type:"object",
       example:{
         statusCode:400,
         message:"bad request"
       }
    },
    description:'body is incorrect'
  })
  @ApiInternalServerErrorResponse({
   status:500,
   schema:{
      type:"object",
      example:{
         statusCode:500,
         message:"server error"
      }
    }
  })
  @ApiBody({
   type:OmitType(UsersDto,["_id","films"] as const)
  })
  @Post()
  async checkData(@Body() body:Omit<UsersDto,"_id"|"films">):Promise<CheckDto>{
    return await this.service.checkData(body);
  };
  
  @ApiOperation({
   summary:"check filmID",
   description:"checked is film watched or not"
  })
  @ApiNotFoundResponse({
   status:404,
   schema:{
      type:"object",
      example:{
         statusCode:404,
         message:"not found"
      }
    },
    description:'path is incorrect'
  })
  @ApiOkResponse({
   status:200,
   type:Boolean,
   description:'film is in journal'
  })
  @ApiBadRequestResponse({
    status:400,
    schema:{
      type:"object",
      example:{
       statusCode:400,
       message:"bad request"
      }
    },
    description:'incorrect body'
  })
  @ApiInternalServerErrorResponse({
   status:500,
   schema:{
      type:"object",
      example:{
         statusCode:500,
         message:"server error"
      }
    }
  })
  @ApiParam({
    name:"id",
    type:String
  })
  @ApiBody({
   type:PickType(FilmsDto,["imdbID"] as const)
  })
  @Post(':id')
  async checkId(@Param('id') id:string,
  @Body() body:Pick<FilmsDto,"imdbID">):Promise<boolean>{
     return this.service.checkId(body.imdbID,id);
  };
}