import { apiClient } from "../../apiClient";
import { Axios } from "@/components/libs/types/type";

async function checkFilmId(imdbID:string,id:string):Promise<boolean> {
  return apiClient.post<boolean>(`check/${id}`,{imdbID})
  .then(({data}:Axios<boolean>)=>data)
}

export default checkFilmId