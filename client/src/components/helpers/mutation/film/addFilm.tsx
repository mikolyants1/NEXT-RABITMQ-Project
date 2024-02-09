import axios, { AxiosResponse } from "axios";
import { IFilms, IUsers } from "../../../types/type";

async function addFilm(args:IFilms&{token:string}):Promise<IUsers> {
 const {_id,token,...body}:IFilms&{token:string} = args;
 return await axios
  .post(`http://localhost:5000/films/${_id}`,body,{
    headers:{
      authorization:`Bearer ${token}`
    }
  })
  .then(({data}:AxiosResponse<IUsers>)=>data);
};

export default addFilm