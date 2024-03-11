import { Body, Controller, Get, Param, Post, SetMetadata } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersDto } from "src/dto/users.dto";
import { Users } from "src/database/user.mongo";
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse,
ApiInternalServerErrorResponse, ApiNotFoundResponse,ApiOkResponse,
ApiOperation, ApiParam, ApiTags, OmitType } from "@nestjs/swagger";

@ApiTags('actions with users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService:UsersService){};
  
  @ApiOperation({
    summary:"get users",
    description:"get all users"
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
    type:[Users],
    description:'users get success'
  })
  @ApiBadRequestResponse({
    status:400,
    schema:{
      type:'object',
      example:{
        statusCode:400,
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
  async getUsers():Promise<Users[]>{
   return await this.userService.getUsers();
  };

  @ApiOperation({
    summary:"get user",
    description:"get one user"
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
    description:'path is inccorrect'
  })
  @ApiOkResponse({
    status:200,
    type:Users,
    description:'user get success'
  })
  @ApiBadRequestResponse({
    status:400,
    schema:{
      type:'object',
      example:{
        statusCode:400,
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
  @Get(':id')
  async getUser(@Param('id') id:string):Promise<Users>{
    return await this.userService.getUser(id);
  };

  @ApiOperation({
    summary:"add user",
    description:"add new user"
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
  @ApiCreatedResponse({
    status:201,
    type:Users,
    description:'user created success'
  })
  @ApiBadRequestResponse({
    status:400,
    schema:{
      type:'object',
      example:{
        statusCode:400,
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
    type:OmitType(UsersDto,["_id","films"] as const)
  })
  @Post()
  async addUser(@Body() body:Omit<UsersDto,"_id"|"films">):Promise<Users>{
    return await this.userService.addUser(body.name,body.pass);
  }
}