import { IQueryData } from "@/components/types/type"
import getFilmComments from "../../query/comment/getFilmComments"
import getFilmById from "../../query/film/getFilmById"

export default (id:string):IQueryData => {
  return [
     {
       queryKey:['comments'],
       queryFn:()=>getFilmComments(id)
     },
     {
       queryKey:['films'],
       queryFn:()=>getFilmById(id)
     }
  ]
}