import { Axios, IFilms } from "@/components/libs/types/type";
import axios from "axios";

async function getFilmByTitle(id:string):Promise<IFilms> {
  return await axios
  .get<IFilms>(`http://www.omdbapi.com/?t=${id}&apikey=b07ab897`)
  .then(({data}:Axios<IFilms>)=>data);
};

export default getFilmByTitle