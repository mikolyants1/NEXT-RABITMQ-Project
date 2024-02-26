import { IFilms } from "@/components/types/type";
import axios, { AxiosResponse } from "axios";

async function getFilmByTitle(id:string):Promise<IFilms> {
  return await axios
  .get(`http://www.omdbapi.com/?t=${id}&apikey=b07ab897`)
  .then(({data}:AxiosResponse<IFilms>)=>data);
};

export default getFilmByTitle