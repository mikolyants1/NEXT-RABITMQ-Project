import {  UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { BanType, EFilmType, EFavoriteType, Roles } from "../enum/enum";
import { AxiosResponse } from "axios";

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

export interface Invalid {
  invalid:boolean,
  color:string
}

export interface IUsers {
  _id:string;
  name:string;
  pass:string;
  films:IFilms[],
  role:Roles
};

export interface ILinks {
  path:string,
  name:string
};

export interface IClearQuery {
  id:string,
  token:string,
  role:string
}

export type Mutate<T,N> = UseMutationResult<unknown,T,N>;

export interface IDelQuery extends IClearQuery {
  _id:string
}
export interface ILogo {
  one:string,
  two:string
};

export interface IBanUsers {
  _id:string,
  userId:string,
  banTime:number
}; 

export interface IMessToAdmin {
  _id:string,
  text:string,
  description:string,
  user:string,
  time:number
}

export interface BanData {
  _id:string,
  userId:string,
  time:number
}
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
  filmID:string,
  role:string
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
  token:string,
  userId:string,
  role:string
};

export type BanBody = Omit<IBanBody,"id"|"type">;

export interface IFilmsBody {
  id:string,
  token:string,
  userId?:string,
  role:string
}
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
  token:string,
  role:string,
  setName:(name:string)=>void,
  setId:(id:string)=>void,
  setToken:(token:string)=>void,
  setRole:(role:string)=>void
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
   token:string,
   role:string
}

export interface IStateMess {
  text:string,
  description:string
}
export interface IMessBody extends ICheck {
  text:string,
  description:string,
  user:string
}
export interface IBanBody extends ICheck {
  id:string,
  type:BanType,
}
export interface IToken {
  token:string,
  role?:string
}
export type Null<T>  = null | T;
export interface IParams {
  id:string
}
export interface IFields {
  name:"name"|"pass",
  title:string
}

export interface IFavorFilmData extends Omit<IFilms,"Director"|"Plot"|"Actors"|"imdbID"> {
  filmId:string
}

export interface IFavorData {
  _id:string,
  userId:string,
  films:IFavorFilmData[],
}

export interface IFavorBody {
   store:IStore,
   film:Omit<IFavorFilmData,"_id">,
   type:EFavoriteType
}

export interface OptimisticAction {
  type:EFilmType,
  payload:string | []
}

export interface IOptimisticContext {
  optimistic:(action:OptimisticAction)=>void
}

export type Axios<T> = AxiosResponse<T>;