import { apiClient } from "../../apiClient";
import {type TAxios } from "@/components/libs/types/type";

async function checkFilmId(imdbID:string,id:string):Promise<boolean> {
  return apiClient.post<boolean>(`check/${id}`,{imdbID})
  .then(({data}:TAxios<boolean>)=>data)
}

export default checkFilmId