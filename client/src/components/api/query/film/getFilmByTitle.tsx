import {type TAxios,type IFilms } from "@/components/libs/types/type";
import axios from 'axios';
import { OmdbUrl } from "../../apiClient";

async function getFilmByTitle(id:string):Promise<IFilms> {
  return axios.get<IFilms>(`${OmdbUrl}&t=${id}`)
  .then(({data}:TAxios<IFilms>)=>data);
};

export default getFilmByTitle