import {type TAxios,type IFilms,type IToken,type IUsers } from "@/components/libs/types/type";
import { apiClient } from "../../apiClient";

type TArgs = IFilms & IToken;

async function addFilm(args:TArgs):Promise<IUsers> {
 const {_id,token,role,...body}:TArgs = args;
 return apiClient.post<IUsers>(
  `films/${_id}?userId=${_id}`,body,{
    headers:{
      authorization:`Bearer ${token}`,
      role:`${role}`
    }
  }).then(({data}:TAxios<IUsers>)=>data);
};

export default addFilm