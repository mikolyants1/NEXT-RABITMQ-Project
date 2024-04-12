import { IFilmsBody, IQueryData } from "@/components/libs/types/type"
import getFilmComments from "../../api/query/comment/getFilmComments"
import getFilmById from "../../api/query/film/getFilmById"

export default (body:IFilmsBody):IQueryData => {
  const {id,userId,token,role}:IFilmsBody = body;
  return [
     {
       queryKey:['comments',id,`${userId}`,token,role],
       queryFn:()=>getFilmComments({id,userId,token,role})
     },
     {
       queryKey:['films',id],
       queryFn:()=>getFilmById(id)
     }
  ]
}