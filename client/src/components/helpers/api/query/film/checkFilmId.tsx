import { AxiosResponse } from "axios";
import { baseUrl } from "../../baseUrl";

async function checkFilmId(imdbID:string,id:string):Promise<boolean> {
  return await baseUrl.post(`check/${id}`,{imdbID})
  .then(({data}:AxiosResponse<boolean>)=>data)
}

export default checkFilmId