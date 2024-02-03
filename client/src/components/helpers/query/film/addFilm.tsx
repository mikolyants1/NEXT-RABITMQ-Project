import axios, { AxiosResponse } from "axios";
import { IFilms, IUsers } from "../../../types/type";

async function addFilm(args:IFilms):Promise<IUsers> {
 const {_id,...body}:IFilms = args;
 return await axios
  .post(`http://localhost:5000/films/${_id}`,body)
  .then(({data}:AxiosResponse<IUsers>)=>data);
};

export default addFilm