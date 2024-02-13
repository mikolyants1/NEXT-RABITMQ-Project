import { Action, IState } from "../types/type";

export const initial:IState = {
    error:false,
    show:false,
    title:""
}

export function reducer(prv:IState,nxt:Action):IState{
  return {
    ...prv,...nxt
   };
};