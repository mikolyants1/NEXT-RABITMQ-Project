import { Injectable } from '@nestjs/common';
import { Comments } from '@server1/models';
import {CreateComment,GetFilmComments,DelComment,GetUserComments} from '@server1/contracts';
import { Model } from 'mongoose';
import { CommentDto, CommentsDto, UpdateDto } from '@server1/apidocs';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comments.name)
    private readonly comm:Model<Comments>
  ){}

   async getCommentsOfFilm(filmID:string):Promise<GetFilmComments.Response>{
    const film:CommentsDto = await this.comm.findOne({filmID});
    return {data:film ? film.comm : []};
   }

   async delCommentOfFilm(filmID:string,time:number):Promise<DelComment.Response>{
    const film:CommentsDto = await this.comm.findOne({filmID});
    const comm:CommentDto[] = film.comm
    .filter((i:CommentDto)=> i.time !== time);
    const data:Comments = await this.comm
     .findOneAndUpdate({filmID},{comm},{new:true});
     return {data};
   }

   async createComment(filmID:string,arg:Omit<UpdateDto,"filmID">):Promise<CreateComment.Response>{
     const {name,...body}:Omit<UpdateDto,"filmID"> = arg;
     const film:CommentsDto = await this.comm.findOne({filmID});
     if (film) {
      const comm:Omit<CommentDto,"_id">[] = film.comm;
      comm.push(body);
      const data:Comments = await this.comm
      .findOneAndUpdate({filmID},{comm},{new:true});
      return {data};
     } else {
      const data:Comments = new this
      .comm({name,filmID,comm:[body]});
      await data.save();
      return {data};
     }
   }

   async getUserComments(userId:string):Promise<GetUserComments.Response>{
    const films:CommentsDto[] = await this.comm.find();
    const data:UpdateDto[] = films.flatMap((i:CommentsDto)=>(
      i.comm.map(({_id,text,time,userId,username}:CommentDto)=>({
        name:i.name,_id,text,time,userId,username,filmID:i.filmID
      }))
    )).filter((i:CommentDto)=>i.userId == userId);
    return {data};
   }
}
