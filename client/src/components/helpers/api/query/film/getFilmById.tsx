import { IFilms } from "@/components/types/type";
import axios, { AxiosResponse } from "axios";

async function getFilmById(id:string):Promise<IFilms> {
  return await axios
  .get(`http://www.omdbapi.com/?apikey=b07ab897&i=${id}`)
  .then(({data}:AxiosResponse<IFilms>)=>data);
};

export default getFilmById