import { Body, Controller, Delete, Param, Post, Query } from "@nestjs/common";
import { FilmsService } from "./films.service";
import { Users } from "src/database/user.mongo";
import { FilmsDto } from "src/dto/films.dto";
import { ApiBadRequestResponse, ApiBody, ApiInternalServerErrorResponse, 
ApiNotFoundResponse, ApiOkResponse, ApiOperation,ApiParam,ApiQuery, ApiTags,
 ApiUnauthorizedResponse, OmitType } from "@nestjs/swagger";

@ApiTags("actions with films")
@Controller('films')
export class FilmsController {
   constructor(private readonly service:FilmsService){};
   
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
      type:String
   })
   @Delete('clear')
   async clearFilm(@Query('filmId') id:string):Promise<Users>{
      return await this.service.clearFilm(id);
   };

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
   async addFilms(@Param('id') id:string,
   @Body() body:Omit<FilmsDto,"_id">):Promise<Users>{
     return await this.service.addFilm(id,body);
   };

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
      description:'del film success'
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
   async delFilm(@Query('userId') id:string,
   @Query('filmId') _id:string):Promise<Users>{
    return this.service.delFilm(id,_id);
   };
};