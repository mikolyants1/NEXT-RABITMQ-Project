import { IFilms } from "@/components/types/type";

function createRows(data:IFilms):string[]{
  return [
    data.Released,
    data.Director,
    data.Actors
    ];
}

export default createRows