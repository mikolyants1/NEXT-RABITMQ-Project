import { Body, Controller,Get,Post, SetMetadata, UseGuards} from "@nestjs/common";
import { ApiBadRequestResponse, ApiBody, ApiInternalServerErrorResponse,
 ApiNotFoundResponse, ApiOkResponse, ApiOperation,
 ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { BanDtoBody } from "@server1/apidocs";
import { BanModel } from "@server1/models";
import { RMQService } from "nestjs-rmq";
import { AdminGuard } from "../guards/admin.guard";
import { AuthGuard } from "../guards/auth.guard";
import { BanType } from "@server1/enums";
import { BanUser, GetBanUsers, UnbanUser } from "@server1/contracts";
import { HttpError } from "@server1/methods";

@SetMetadata("roles",["admin"])
@ApiTags("ban users")
@Controller("ban")
export class BanController {
    constructor(private readonly rmq:RMQService){}

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
    async banUser(@Body() {id,type}:BanDtoBody):Promise<string[]>{
      try {
        if (type === BanType.BAN){
          const {users} = await this.rmq.send<
            BanUser.Request,
            BanUser.Response
          >(BanUser.topic,{id});
          return users;
        } else if (type === BanType.UNBAN){
          const {users} = await this.rmq.send<
            UnbanUser.Request,
            UnbanUser.Response
          >(UnbanUser.topic,{id});
          return users;
        } else {
          throw new Error("incorrect type");
        }
      } catch (e) {
        if (e instanceof Error){
          throw new HttpError(e.message).throwError();
        }
      }
    }

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
    async getAllUsers():Promise<string[]>{
      try {
        const {users} = await this.rmq.send<
          GetBanUsers.Request,
          GetBanUsers.Response
        >(GetBanUsers.topic,{});
        return users;
      } catch (e) {
        if (e instanceof Error){
          throw new HttpError(e.message).throwError();
        }
      }
    }
}