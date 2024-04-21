import {type IFavorCreateMap,type IFilms } from "@/components/libs/types/type";

export const createFavoriteMap = ({
    favorite,
    films
}:IFavorCreateMap):IFilms[] => {
  const catchFavor = (id:string):boolean => {
    return favorite.some(c => c.filmId == id);
  }

  const favor:IFilms[] = films
  .filter(i => catchFavor(i.imdbID));
  return favor.length > 3 ? favor.slice(0,3) : favor;
}