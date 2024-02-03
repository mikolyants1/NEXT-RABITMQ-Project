import axios, { AxiosResponse } from "axios";

async function checkFilmId(imdbID:string,id:string):Promise<boolean> {
  return await axios
  .post(`http://localhost:5000/check/${id}`,{imdbID})
  .then(({data}:AxiosResponse<boolean>)=>data)
}

export default checkFilmId