import { IFavorFilm } from "./favorFilm.interfaces";

export interface IFavor {
  _id?:string,
  userId:string,
  films:IFavorFilm[]
}
