import { IQueries } from "@/components/types/type";
import { UseQueryResult } from "@tanstack/react-query";

export default (data:any):IQueries => {
    const [comm,film] = data;
  return {
     comm:comm.data,
     film:film.data
  }
}