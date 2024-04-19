import { IFilms } from "../account/films.interfaces";

export interface IFavorFilm extends Omit<IFilms,"Plot"|"Director"|"Actors"|"imdbID">{
    filmId:string
}