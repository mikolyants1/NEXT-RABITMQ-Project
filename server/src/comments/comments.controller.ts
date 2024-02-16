import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query, UseGuards} from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { CommentDto, UpdateDto } from "src/dto/comment.dto";
import { Comments } from "src/database/comments.mongo";
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse,ApiInternalServerErrorResponse,
ApiNotFoundResponse,ApiOkResponse,ApiOperation,ApiParam, ApiQuery, ApiTags,
ApiUnauthorizedResponse, OmitType } from "@nestjs/swagger";
import { AuthGuard } from "src/middlewares/AuthGuard";

@ApiTags("action with comments")
@Controller('comments')
export class CommentsController {
    constructor(private readonly service:CommentsService){};

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
    @UseGuards(AuthGuard)
    @Get('film')
    async getComments(@Query('filmID') id:string):Promise<CommentDto[]>{
      return await this.service.getCommentsOfFilm(id);
    };
     
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
    @UseGuards(AuthGuard)
    @Delete(":id")
    async delComment(@Param('id') id:string,
    @Query('time',ParseIntPipe) time:number):Promise<Comments>{
      return await this.service.delCommentOfFilm(id,time);
    };

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
    @UseGuards(AuthGuard)
    @Post(':id')
    async createComment(@Param('id') id:string,
    @Body() {name,...body}:Omit<UpdateDto,"filmID">):Promise<Comments>{
      return await this.service.createComment(id,name,body);
    };

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
    @UseGuards(AuthGuard)
    @Get('user')
    async getUserComments(@Query('userId') id:string):Promise<UpdateDto[]>{
      return await this.service.getUserComments(id);
    };
}