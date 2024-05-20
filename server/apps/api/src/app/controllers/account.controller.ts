import { Controller, Get, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiInternalServerErrorResponse,
ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam } from "@nestjs/swagger";
import {GetUser,GetUsers,AddUser} from '@server1/contracts';
import { HttpError } from '@server1/methods';
import { UserBody } from "@server1/apidocs";
import { RMQService } from "nestjs-rmq";
import { Users } from "@server1/models";
import { Request, Response } from "express";

@Controller("users")
export class AccountController {
    constructor(private readonly rmq:RMQService){}
 
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
      async getUsers(@Res() res:Response){
        try {
          const {users} = await this.rmq.send<
            GetUsers.Request,
            GetUsers.Response
          >(GetUsers.topic,{});
          return res.status(HttpStatus.OK).json(users);
        } catch (e) {
          if (e instanceof Error){
            throw new HttpError(e.message).throwError();
          }
        }
      }
    
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
      async getUser(@Req() req:Request,@Res() res:Response){
        try {
          const id:string = req.params.id;
          const {users} = await this.rmq.send<
            GetUser.Request,
            GetUser.Response
          >(GetUser.topic,{id});
          return res.status(HttpStatus.OK).json(users);
        } catch (e) {
          console.log(e)
          if (e instanceof Error){
            throw new HttpError(e.message).throwError();
          }
        }
      }
    
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
        type:UserBody
      })
      @Post()
      async addUser(@Req() req:Request,@Res() res:Response){
        try {
          const {users} = await this.rmq.send<
            AddUser.Request,
            AddUser.Response
          >(AddUser.topic,req.body);
          return res.status(HttpStatus.CREATED).json(users);
        } catch (e) {
          if (e instanceof Error){
            throw new HttpError(e.message).throwError();
          }
        }
      }
    }
    