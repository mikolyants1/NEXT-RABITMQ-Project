import { QueryFunction, UseQueryResult } from "@tanstack/react-query";
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

export interface IClearQuery {
  id:string,
  token:string
}
export interface IDelQuery extends IClearQuery {
  _id:string
}
export interface ILogo {
  one:string,
  two:string
};

export interface ICommContext {
  answer:(name:string)=>()=>void,
};

export interface IComment {
  _id:string,
  text:string,
  time:number,
  userId:string,
  username:string
};

export interface ICommBody extends Omit<IComment,"_id"> {
  name:string,
  filmID:string
};

export interface IQueries {
  comm:IComment[],
  film:IFilms
}

export interface datas<T> {
  isError:boolean,
  isLoading:boolean,
  data:T
};

export type UserComm = Omit<ICommBody,"filmID">;

export interface ICommDelBody {
  id:string,
  time:number,
  token:string
};

export type IQueryData = [
  {
    queryKey:string[],
    queryFn:()=>Promise<IComment[]>
  },
  {
    queryKey:string[],
    queryFn:()=>Promise<IFilms>
  }
]

export type QResult = [UseQueryResult<IComment[]>,UseQueryResult<IFilms>];

export interface IComments {
  _id:string,
  name:string,
  filmID:string,
  comm:IComment[]
};

export interface IStore {
  name:string,
  id:string,
  token:string
  setName:(name:string)=>void,
  setId:(id:string)=>void,
  setToken:(token:string)=>void
}

export interface IState {
   error:boolean
   show:boolean,
   title:string
}

export type Action = Record<string,IState[keyof IState]>;

export type form = Omit<IUsers,"_id"|'posts'>;

export type Control<T extends string> = ControllerRenderProps<FieldValues,T>;

export interface ICheck {
   _id:string,
   token:string
}

export interface IToken {
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