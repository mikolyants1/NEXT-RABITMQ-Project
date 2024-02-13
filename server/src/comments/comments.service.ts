import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Comments } from "src/database/comments.mongo";
import { CommentDto } from "src/dto/comment.dto";
import { CommentsDto } from "src/dto/comments.dto";

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comments.name) private readonly comm:Model<Comments>){};

   async getCommentsOfFilm(filmID:string):Promise<CommentDto[]>{
    const film:undefined|CommentsDto = await this.comm.findOne({filmID});
    return film ? film.comm : [];
   };

   async delCommentOfFilm(filmID:string,time:number):Promise<Comments>{
    const film:undefined|CommentsDto = await this.comm.findOne({filmID});
    const comm:CommentDto[] = film.comm
    .filter((i:CommentDto)=> i.time !== time);
    return await this.comm
     .findOneAndUpdate({filmID},{comm},{new:true})
     .exec();
   };

   async createComment(filmID:string,name:string,body:Omit<CommentDto,"_id">):Promise<Comments>{
     const film:undefined|CommentsDto = await this.comm.findOne({filmID});
     if (film) {
      const comm:Omit<CommentDto,"_id">[] = film.comm;
      comm.push(body);
      return await this.comm
      .findOneAndUpdate({filmID},{comm},{new:true})
      .exec();
     } else {
      return await new this
      .comm({name,filmID,comm:[body]})
      .save();
     };
   };

   async getUserComments(userId:string):Promise<Array<CommentDto&{name:string,filmID:string}>>{
    const films:CommentsDto[] = await this.comm.find();
    return films.flatMap(({comm,name,filmID}:CommentsDto)=>(
      comm.map(({_id,text,time,userId,username}:CommentDto)=>({
        name,_id,text,time,userId,username,filmID
      }))
    )).filter((i:CommentDto)=>i.userId == userId);
   };
}