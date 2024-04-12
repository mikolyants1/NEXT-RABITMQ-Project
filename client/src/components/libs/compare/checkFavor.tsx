import { IFavorData, IFavorFilmData } from "@/components/libs/types/type";

export function checkFavor(data:IFavorData[],id:string,userId:string):boolean{
  if (!data.length) return false;
  const user:IFavorData|undefined = data
  .find((i:IFavorData)=>i.userId == userId);
  console.log(userId,data[0].userId)
  if (!user) return false;
  console.log(user)
  return user.films.some((i:IFavorFilmData)=>i.filmId == id);
}