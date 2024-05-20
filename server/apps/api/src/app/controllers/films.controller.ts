import { Body, Controller, Delete, Param, Post, Query, SetMetadata, UseGuards} from "@nestjs/common";
import { ApiBadRequestResponse, ApiBody, ApiInternalServerErrorResponse, 
ApiNotFoundResponse, ApiOkResponse, ApiOperation,ApiParam,ApiQuery, ApiTags,
ApiUnauthorizedResponse,OmitType} from "@nestjs/swagger";
import { RMQService } from "nestjs-rmq";
import { AuthGuard } from "../guards/auth.guard";
import { AdminGuard } from "../guards/admin.guard";
import { Users } from "@server1/models";
import { ClearFilm, CreateFilm, DelFilm } from "@server1/contracts";
import { FilmsDto } from "@server1/apidocs";
import { HttpError } from "@server1/methods";
import { StrategyGuard } from "../guards/strategy.guard";

@SetMetadata("roles",["admin","guest"])
@ApiTags("actions with films")
@Controller('films')
export class FilmsController {
   constructor(private readonly rmq:RMQService){}
   
   @ApiOperation({
      summary:'clear films',
      description:"clear user's film journal"
   })
   @ApiNotFoundResponse({
      status:404,
      schema:{
         type:'object',
         example:{
            statusCode:404,
            message:"not found"
         }
      },
      description:'path is incorrect'
   })
   @ApiOkResponse({
      status:200,
      type:Users,
      description:'journal clear success'
   })
   @ApiBadRequestResponse({
      status:400,
      schema:{
         type:'object',
         example:{
            statusCode:400,
            message:"bad request"
         }
      },
      description:'body is incorrect'
   })
   @ApiUnauthorizedResponse({
      status:401,
      schema:{
         type:"object",
         example:{
            statusCode:401,
            message:"user is not auth"
         }
      },
      description:'jwt token is outdated'
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
      name:"filmId",
      type:String,
      example:'tt12345'
   })
   @Delete('clear')
   @UseGuards(StrategyGuard)
   @UseGuards(AdminGuard)
   async clearFilm(@Query('userId') id:string):Promise<Users>{
      try {
        const {data} = await this.rmq.send<
          ClearFilm.Request,
          ClearFilm.Response
        >(ClearFilm.topic,{id});
        return data;
      } catch (e) {
         if (e instanceof Error){
           throw new HttpError(e.message).throwError();
         }
      }
   }

   @ApiOperation({
      summary:"add film",
      description:"add new watched film"
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
      status:201,
      type:Users,
      description:'film add success'
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
     type:OmitType(FilmsDto,["_id"] as const)
   })
   @Post(':id')
   @UseGuards(StrategyGuard)
   @UseGuards(AdminGuard)
   async addFilms(
     @Param('id') id:string,
     @Body() body:Omit<FilmsDto,"_id">
   ):Promise<Users>{
     try {
       const {data} = await this.rmq.send<
         CreateFilm.Request,
         CreateFilm.Response
       >(CreateFilm.topic,{id,body});
       return data;
     } catch (e) {
      if (e instanceof Error){
         throw new HttpError(e.message).throwError();
      }
     }
   }

   @ApiOperation({
      summary:"del film",
      description:"delete film from journal"
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
   @ApiOkResponse({
      status:200,
      type:Users,
      description:'film was deleted success'
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
   @ApiQuery({
     name:"filmId",
     type:String
   })
   @Delete('delOne')
   @UseGuards(StrategyGuard)
   @UseGuards(AdminGuard)
   async delFilm(
      @Query('userId') id:string,
      @Query('filmId') _id:string
   ):Promise<Users>{
     try {
       const {data} = await this.rmq.send<
         DelFilm.Request,
         DelFilm.Response
       >(DelFilm.topic,{id,_id});
       return data;
     } catch (e) {
       if (e instanceof Error){
         throw new HttpError(e.message).throwError();
       }
     }
   }
}