import {type IFavorData,type IFavorFilmData } from "@/components/libs/types/type";

interface IArgs {
  data:IFavorFilmData[],
  id:string,
  userId:string
}
export function checkFavor({data,userId,id}:IArgs):boolean{
  if (!data.length) return false;
  return data.some((i:IFavorFilmData)=>i.filmId == id);
}