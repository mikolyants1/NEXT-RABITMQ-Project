import {type TAxios,type IFilms } from "@/components/libs/types/type";
import axios from "axios";
import { OmdbUrl } from "../../apiClient";

async function getFilmById(id:string):Promise<IFilms> {
  return axios.get<IFilms>(`${OmdbUrl}&i=${id}`)
  .then(({data}:TAxios<IFilms>)=>data);
};

export default getFilmById