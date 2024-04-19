import { Body, Controller, Delete, Get, Param, Post, SetMetadata} from "@nestjs/common";
import { ApiBadRequestResponse, ApiBody, ApiInternalServerErrorResponse,
 ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam,
 ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { MessAdmin } from "@server1/apidocs";
import { CreateMessage,DelMessage, GetMessage } from "@server1/contracts";
import { Mess } from "@server1/models";
import { RMQService } from "nestjs-rmq";
import { Auth } from "../guards/combine.guard";
import { HttpError } from "@server1/methods";

@ApiTags("mess to admin")
@SetMetadata("roles",["guest"])
@Controller("mess")
export class MessageController {
  constructor(private readonly rmq:RMQService){}

    @ApiOperation({
        summary:"send mess",
        description:"send mess to admin"
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
        type:Mess,
        description:'send mess to admin success'
    })
    @ApiUnauthorizedResponse({
        status:401,
        schema:{
          type:'object',
          example:{
            statusCode:401,
            message:"unauthorized"
          }
        },
        description:'jwt token is outdated'
    })
    @ApiBadRequestResponse({
        status:400,
        schema:{
          type:'object',
          example:{
            statuscode:400,
            message:'bad request'
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
      type:MessAdmin
    })
    @Post()
    @Auth(["guest"])
    async createMess(@Body() body:MessAdmin):Promise<Mess>{
      try {
        const {data} = await this.rmq.send<
          CreateMessage.Request,
          CreateMessage.Response
        >(CreateMessage.topic,{body});
        return data;
      } catch (e) {
        if (e instanceof Error){
          throw new HttpError(e.message).throwError();
        }
      }
    }

    @ApiOperation({
        summary:"delete mess",
        description:"delete mess"
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
        type:Mess,
        description:'admin del mess success'
    })
    @ApiUnauthorizedResponse({
        status:401,
        schema:{
          type:'object',
          example:{
            statusCode:401,
            message:"unauthorized"
          }
        },
        description:'jwt token is outdated'
    })
    @ApiBadRequestResponse({
        status:400,
        schema:{
          type:'object',
          example:{
            statuscode:400,
            message:'bad request'
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
    @ApiParam({
      name:"id",
      type:String
    })
    @Delete(":id")
    @Auth(["admin"])
    async deleteMess(@Param("id") id:string):Promise<Mess>{
      try {
        const {data} = await this.rmq.send<
          DelMessage.Request,
          DelMessage.Response
        >(DelMessage.topic,{id});
      return data;
      } catch (e) {
        if (e instanceof Error){
          throw new HttpError(e.message).throwError();
        }
      }
    }

    @ApiOperation({
        summary:"get mess",
        description:"get mess to admin"
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
        type:Mess,
        description:'get mess to admin success'
    })
    @ApiUnauthorizedResponse({
        status:401,
        schema:{
          type:'object',
          example:{
            statusCode:401,
            message:"unauthorized"
          }
        },
        description:'jwt token is outdated'
    })
    @ApiBadRequestResponse({
        status:400,
        schema:{
          type:'object',
          example:{
            statuscode:400,
            message:'bad request'
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
    @Get()
    @Auth(["admin","guest"])
    async getMess():Promise<Mess[]>{
      try {
        const {data} = await this.rmq.send<
          GetMessage.Request,
          GetMessage.Response
        >(GetMessage.topic,{});
      return data;
      } catch (e) {
        if (e instanceof Error){
          throw new HttpError(e.message).throwError();
        }
      }
    }
}