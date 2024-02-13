import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { CommentDto } from "src/dto/comment.dto";
import { Comments } from "src/database/comments.mongo";

@Controller('comments')
export class CommentsController {
    constructor(private readonly service:CommentsService){};

    @Get('film')
    async getComments(@Query('filmID') id:string):Promise<CommentDto[]>{
      return await this.service.getCommentsOfFilm(id);
    };

    @Delete(":id")
    async delComment(@Param('id') id:string,
    @Query('time',ParseIntPipe) time:number):Promise<Comments>{
      return await this.service.delCommentOfFilm(id,time);
    };

    @Post(':id')
    async createComment(@Param('id') id:string,
    @Body() {name,...body}:CommentDto&{name:string}):Promise<Comments>{
      return await this.service.createComment(id,name,body);
    };

    @Get('user')
    async getUserComments(@Query('userId') userId:string):Promise<
    Array<CommentDto&{name:string}>>{
      return await this.service.getUserComments(userId);
    };
}