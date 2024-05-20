import {type IUsers,type IClearQuery,type TAxios } from "@/components/libs/types/type";
import { apiClient } from "../../apiClient";

async function clearFilm({id,token,role}:IClearQuery):Promise<IUsers> {
    return apiClient.delete<IUsers>(
    'films/clear',{
      headers:{
        Authorization:`Bearer ${token}`,
        "x-user":id,
        role
      }
    }).then(({data}:TAxios<IUsers>)=>data);
}

export default clearFilm