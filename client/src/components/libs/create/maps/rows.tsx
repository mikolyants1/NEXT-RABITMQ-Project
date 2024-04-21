import {type IFilms } from "@/components/libs/types/type";

function createRows(data:IFilms):string[]{
  return [
    data.Released,
    data.Director,
    data.Actors
    ];
}

export default createRows