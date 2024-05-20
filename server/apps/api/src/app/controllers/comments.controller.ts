import { Body, Controller, Delete, Get, Headers, Param, ParseIntPipe, Post, Query, SetMetadata, UseGuards} from "@nestjs/common";
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse,ApiInternalServerErrorResponse,
ApiNotFoundResponse,ApiOkResponse,ApiOperation,ApiParam, ApiQuery, ApiTags,
ApiUnauthorizedResponse, OmitType } from "@nestjs/swagger";
import { RMQService } from "nestjs-rmq";
import { AuthGuard } from "../guards/auth.guard";
import { CreateComment, DelComment, GetFilmComments, GetUserComments } from "@server1/contracts";
import { AdminGuard } from "../guards/admin.guard";
import { BanGuard } from "../guards/ban.guard";
import { CommentDto, UpdateDto } from "@server1/apidocs";
import { Comments } from "@server1/models";
import { HttpError } from "@server1/methods";

@SetMetadata("roles",["admin","guest"])
@ApiTags("action with comments")
@Controller('comments')
export class CommentsController {
  constructor(private readonly rmq:RMQService){}

    @ApiOperation({
      summary:"get film comments",
      description:"get film under comments"
    })
    @ApiOkResponse({
      status:200,
      type:[CommentDto],
      description:'comments get success'
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
         type:"object",
         example:{
          statusCode:400,
          message:"bad request"
         }
       },
       description:'body is not correct'
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
    @ApiQuery({
      name:"filmID",
      type:String
    })
    @Get('film')
    @UseGuards(AuthGuard)
    async getFilmComments(@Query('filmID') id:string):Promise<CommentDto[]>{
      try {
        const {data} = await this.rmq.send<
          GetFilmComments.Request,
          GetFilmComments.Response
        >(GetFilmComments.topic,{id});
        return data;
      } catch (e) {
        if (e instanceof Error){
          throw new HttpError(e.message).throwError();
        }
      }
    }
     
    @ApiOperation({
      summary:'delete comment',
      description:"delete comment"
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
      type:Comments,
      description:'comment delete success'
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
    @ApiQuery({
      name:"time",
      type:String
    })
    @Delete(":id")
    @UseGuards(AuthGuard)
    @UseGuards(AdminGuard)
    async delComment(
      @Param('id') id:string,
      @Query('time',ParseIntPipe) time:number
    ):Promise<Comments>{
      try {
      const {data} = await this.rmq.send<
        DelComment.Request,
        DelComment.Response
      >(DelComment.topic,{id,time});
      return data;
      } catch (e) {
        if (e instanceof Error){
          throw new HttpError(e.message).throwError();
        }
      }
    }

    @ApiOperation({
      summary:"create comment",
      description:"create comment"
    })
    @ApiNotFoundResponse({
      status:404,
      schema:{
        type:"object",
        example:{
          statusCode:404,
          message:"not found"
        }
      }
    })
    @ApiCreatedResponse({
      status:201,
      type:Comments,
      description:'comment create success'
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
    @ApiBody({
      type:OmitType(UpdateDto,["filmID"] as const)
    })
    @Post(':id')
    @UseGuards(AuthGuard)
    @UseGuards(BanGuard)
    @UseGuards(AdminGuard)
    async createComment(
      @Param('id') id:string,
      @Body() body:Omit<UpdateDto,"filmID">
    ):Promise<Comments>{
      try {
        const {data} = await this.rmq.send<
          CreateComment.Request,
          CreateComment.Response
        >(CreateComment.topic,{id,body});
        return data;
      } catch (e) {
        if (e instanceof Error){
          throw new HttpError(e.message).throwError();
        }
      }
    }

    @ApiOperation({
      summary:"get user comments",
      description:"get user comments"
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
      type:[UpdateDto],
      description:'user comments get success'
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
    @ApiQuery({
      name:"userId",
      type:String
    })
    @Get('user')
    @UseGuards(AuthGuard)
    @UseGuards(AdminGuard)
    async getUserComments(@Headers('x-user') id:string):Promise<UpdateDto[]>{
      try {
        const {data} = await this.rmq.send<
          GetUserComments.Request,
          GetUserComments.Response
        >(GetUserComments.topic,{id});
        return data;
      } catch (e) {
        if (e instanceof Error){
          throw new HttpError(e.message).throwError();
        }
      }
    }
}