import { ControllerRenderProps, FieldValues } from "react-hook-form";

export interface IFilms {
  _id:string;
  imdbID:string;
  Title:string;
  Actors:string;
  Released:string;
  Director:string;
  Poster:string;
  Plot:string
}

export interface IUsers {
  _id:string;
  name:string;
  pass:string;
  films:IFilms[]
};

export interface ILinks {
  path:string,
  name:string
};

export interface ILogo {
  one:string,
  two:string
};

export interface IStore {
  name:string,
  id:string,
  token:string
  setName:(name:string)=>void,
  setId:(id:string)=>void,
  setToken:(token:string)=>void
}

export type form = Omit<IUsers,"_id"|'posts'>;

export type Control<T extends string> = ControllerRenderProps<FieldValues,T>;

export interface ICheck {
   _id:string,
   token:string
}

export type Null<T>  = null | T;
export interface IParams {
  id:string
}
export interface fields {
  Name:"name"|"pass",
  title:string
}