import { Body, Controller, Get, Post, Query, SetMetadata, UseGuards } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBody, ApiInternalServerErrorResponse, ApiNotFoundResponse,
 ApiOkResponse, ApiOperation, ApiQuery, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { RMQService } from "nestjs-rmq";
import { AuthGuard } from "../guards/auth.guard";
import { AdminGuard } from "../guards/admin.guard";
import { FavorBodyFilm, FavorFilmDto } from "@server1/apidocs";
import { FavoriteType } from "@server1/enums";
import { FavoriteCreate, FavoriteDelete, GetFavorite } from "@server1/contracts";
import { FavorModel } from "@server1/models";
import { HttpError } from "@server1/methods";

@ApiTags("set or del favorite")
@SetMetadata("roles",["guest","admin"])
@Controller("favorite")
export class FavoriteController {
    constructor(private readonly rmq:RMQService){}

     @ApiOperation({
        summary:"set favor",
        description:"choice film as favorite"
     })
     @ApiOkResponse({
        status:201,
        type:FavorModel,
        description:"film add success to base"
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
        description:"bad request"
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
        description:"path is undefined"
     })
     @ApiUnauthorizedResponse({
        status:401,
        schema:{
            type:"object",
            example:{
                statusCode:401,
                message:"unauthorized"
            }
        },
        description:"token is inccorect"
     })
     @ApiInternalServerErrorResponse({
        status:500,
        schema:{
            type:"object",
            example:{
                statusCode:500,
                message:"server error"
            }
        },
        description:"something going wrong on server"
     })
     @ApiQuery({
        name:"userId",
        type:String
     })
     @ApiBody({
        type:FavorFilmDto
     })
     @Post("add")
     @UseGuards(AuthGuard)
     @UseGuards(AdminGuard)
     async actionWithFavor(
      @Query("userId") userId:string,
      @Body() film:FavorBodyFilm
     ):Promise<FavorModel>{
       try {
         switch (film.type) {
           case FavoriteType.DELETE:
            // eslint-disable-next-line no-case-declarations
             const delSuccess = await this.rmq.send<
               FavoriteDelete.Request,
               FavoriteDelete.Response
             >(FavoriteDelete.topic,{userId,filmId:film.filmId});
             return delSuccess.data;
           case FavoriteType.ADD:
            // eslint-disable-next-line no-case-declarations
             const addSuccess = await this.rmq.send<
               FavoriteCreate.Request,
               FavoriteCreate.Response
             >(FavoriteCreate.topic,{userId,film});
             return addSuccess.data;
           default:
            throw new Error("bad request: action type");
         }
       } catch (e) {
         if (e instanceof Error){
            throw new HttpError(e.message).throwError();
         }
       }
     }

     @ApiOperation({
        summary:"get favor",
        description:"choice film as favorite"
     })
     @ApiOkResponse({
        status:200,
        type:[FavorModel],
        description:"film add success to base"
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
        description:"bad request"
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
        description:"path is undefined"
     })
     @ApiUnauthorizedResponse({
        status:401,
        schema:{
            type:"object",
            example:{
                statusCode:401,
                message:"unauthorized"
            }
        },
        description:"token is inccorect"
     })
     @ApiInternalServerErrorResponse({
        status:500,
        schema:{
            type:"object",
            example:{
                statusCode:500,
                message:"server error"
            }
        },
        description:"something going wrong on server"
     })
     @ApiQuery({
        name:"userId",
        type:String
     })
     @Get()
     @UseGuards(AuthGuard)
     @UseGuards(AdminGuard)
     async getFavor(@Query("userId") id:string):Promise<FavorFilmDto[]>{
       try {
         const {data} = await this.rmq.send<
           GetFavorite.Request,
           GetFavorite.Response
         >(GetFavorite.topic,{id});
         return data;
       } catch (e) {
         if (e instanceof Error){
            throw new HttpError(e.message).throwError();
         }
       }
     }
}