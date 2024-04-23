import {type TAction,type IState } from "@/components/libs/types/type";

export const initial:IState = {
    error:false,
    show:false,
    title:""
}

export function reducer(prv:IState,nxt:TAction):IState{
  return {
     ...prv, ...nxt
   };
};