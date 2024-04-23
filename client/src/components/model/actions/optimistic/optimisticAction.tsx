import { EFilmType } from "@/components/libs/enum/enum";
import {type IFilms,type IOptimisticAction } from "@/components/libs/types/type";

export const optimisticAction = (
  state:IFilms[],
  action:IOptimisticAction
):IFilms[] => {
  switch (action.type) {
    case EFilmType.CLEAR:
      if (Array.isArray(action.payload)){
        return action.payload;
      };
    case EFilmType.DELETE:
      if (typeof action.payload == "number"){
        return state.filter((i:IFilms)=>(
          i._id !== action.payload
        ));
      };
    default:
      return state;
  }
}