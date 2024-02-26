import axios, { AxiosResponse } from "axios";
import { IFilms, IToken, IUsers } from "../../../../types/type";
import { baseUrl } from "../../baseUrl";

async function addFilm(args:IFilms&IToken):Promise<IUsers> {
 const {_id,token,...body}:IFilms&IToken = args;
 return await baseUrl.post(`films/${_id}`,body,{
    headers:{
      authorization:`Bearer ${token}`
    }
  })
  .then(({data}:AxiosResponse<IUsers>)=>data);
};

export default addFilm