import { IQueryData } from "@/components/types/type"
import getFilmComments from "../../api/query/comment/getFilmComments"
import getFilmById from "../../api/query/film/getFilmById"

export default (id:string,userId:string,token:string):IQueryData => {
  return [
     {
       queryKey:['comments',id,userId,token],
       queryFn:()=>getFilmComments(id,userId,token)
     },
     {
       queryKey:['films',id],
       queryFn:()=>getFilmById(id)
     }
  ]
}