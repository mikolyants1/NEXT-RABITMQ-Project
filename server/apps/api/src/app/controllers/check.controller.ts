import { Body, Controller, Param, Post } from "@nestjs/common";
import {ApiBadRequestResponse, ApiBody,
ApiInternalServerErrorResponse, ApiNotFoundResponse,
ApiOkResponse,ApiOperation, ApiParam, ApiTags, 
 PickType,} from '@nestjs/swagger';
import { CheckDto, FilmsDto, UserBody } from "@server1/apidocs";
import { CheckId, CheckUser } from "@server1/contracts";
import { HttpError } from "@server1/methods";
import { RMQService } from "nestjs-rmq";

@ApiTags('check correct data')
@Controller('check')
export class CheckController {
  constructor(private readonly rmq:RMQService){}

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
   type:UserBody
  })
  @Post()
  async checkData(@Body() body:UserBody):Promise<CheckDto>{
    try {
      return this.rmq.send<
        CheckUser.Request,
        CheckUser.Response
      >(CheckUser.topic,{body});
    } catch (e) {
      if (e instanceof Error){
        throw new HttpError(e.message).throwError();
      }
    }
  }
  
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
  async checkId(
    @Param('id') id:string,
    @Body() body:Pick<FilmsDto,"imdbID">
  ):Promise<boolean>{
    try {
      const {result} = await this.rmq.send<
        CheckId.Request,
        CheckId.Response
      >(CheckId.topic,{id,body});
      return result;
    } catch (e) {
      if (e instanceof Error){
        throw new HttpError(e.message).throwError();
      }
    }
  }
}