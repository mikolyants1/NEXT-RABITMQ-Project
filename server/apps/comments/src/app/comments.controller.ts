import { Controller} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { RMQRoute } from 'nestjs-rmq';
import { CreateComment, DelComment, GetFilmComments, GetUserComments } from '@server1/contracts';

@Controller()
export class CommentsController {
  constructor(private readonly service:CommentsService){}

  @RMQRoute(GetFilmComments.topic)
  async getFilmComments({id}:GetFilmComments.Request){
    return this.service.getCommentsOfFilm(id);
  }

  @RMQRoute(GetUserComments.topic)
  async getUserComments({id}:GetUserComments.Request){
    return this.service.getUserComments(id);
  }

  @RMQRoute(DelComment.topic)
  async deleteComment({id,time}:DelComment.Request){
    return this.service.delCommentOfFilm(id,time);
  }

  @RMQRoute(CreateComment.topic)
  async createComment({id,body}:CreateComment.Request){
    return this.service.createComment(id,body);
  }
}
