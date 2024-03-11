import { Body, Controller,Get,Post, SetMetadata, UseGuards} from "@nestjs/common";
import { BanService } from "./ban.service";
import { BanModel } from "src/database/ban.mongo";
import { ApiBadRequestResponse, ApiBody, ApiInternalServerErrorResponse,
 ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { BanDtoBody } from "src/dto/ban.dto";
import { BanType } from "src/enums/ban.enum";
import { AdminGuard } from "src/guards/admin.guard";
import { AuthGuard } from "src/guards/auth.guard";

@SetMetadata("roles",["admin"])
@ApiTags("ban users")
@Controller("ban")
export class BanController {
    constructor(private readonly service:BanService){}

    @ApiOperation({
      summary:"ban user",
      description:"ban or unban user"
    })
    @ApiOkResponse({
      status:200,
      type:BanModel,
      description:"success ban or unban with user"
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
      type:BanDtoBody
    })
    @Post()
    @UseGuards(AdminGuard)
    @UseGuards(AuthGuard)
    async banUser(@Body() {id,type}:BanDtoBody):Promise<BanModel>{
       if (type === BanType.BAN){
        return await this.service.banUser(id);
       } else if (type === BanType.UNBAN){
         return await this.service.unBabUser(id);
       } else {
         throw new Error("incorrect type");
       };
    };

    @ApiOperation({
      summary:"banned users",
      description:"get all banned users"
    })
    @ApiOkResponse({
      status:200,
      type:BanModel,
      description:"success get banned users"
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
    @UseGuards(AdminGuard)
    @UseGuards(AuthGuard)
    async getAllUsers():Promise<BanModel[]>{
      return await this.service.getAllUsers();
    };
}