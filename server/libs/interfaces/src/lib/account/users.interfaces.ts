import { Roles } from "@server1/enums"
import { IFilms } from "./films.interfaces";

export interface IUsers {
  _id?: string,
  name: string,
  pass: string,
  role: Roles,
  films: IFilms[],
}
