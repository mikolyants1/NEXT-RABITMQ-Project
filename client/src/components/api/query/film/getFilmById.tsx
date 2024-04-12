import { Axios, IFilms } from "@/components/libs/types/type";
import axios from "axios";

async function getFilmById(id:string):Promise<IFilms> {
  return axios.get<IFilms>(
  `http://www.omdbapi.com/?apikey=b07ab897&i=${id}`)
  .then(({data}:Axios<IFilms>)=>data);
};

export default getFilmById