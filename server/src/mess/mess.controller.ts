import { Body, Controller, Delete, Get, Param, Post, SetMetadata, UseGuards } from "@nestjs/common";
import { MessService } from "./mess.service";
import { Mess } from "src/database/mess.mongo";
import { MessDto } from "src/dto/mess.dto";
import { ApiBadRequestResponse, ApiBody, ApiInternalServerErrorResponse,
 ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam,
  ApiTags,
  ApiUnauthorizedResponse, OmitType } from "@nestjs/swagger";
import { AuthGuard } from "src/guards/auth.guard";
import { AdminGuard } from "src/guards/admin.guard";

@ApiTags("mess to admin")
@SetMetadata("roles",["guest"])
@Controller("mess")
export class MessController {
    constructor(private readonly service:MessService){}

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
      type:OmitType(MessDto,["_id","time"] as const)
    })
    @Post()
    @SetMetadata("roles",["guest"])
    @UseGuards(AuthGuard)
    @UseGuards(AdminGuard)
    async createMess(@Body() body:Omit<MessDto,"_id"|"time">):Promise<Mess>{
      return await this.service.addMess(body);
    };

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
    @SetMetadata("roles",["admin"])
    @UseGuards(AuthGuard)
    @UseGuards(AdminGuard)
    @Delete("/:id")
    async deleteMess(@Param("id") id:string):Promise<Mess>{
      return await this.service.delMess(id);
    };

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
    @SetMetadata("roles",["admin","guest"])
    @UseGuards(AuthGuard)
    @UseGuards(AdminGuard)
    async getMess():Promise<Mess[]>{
      return await this.service.getAllMess();
    };
}