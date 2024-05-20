import {type TAxios, type IDelQuery,type IUsers } from "@/components/libs/types/type";
import { apiClient } from "../../apiClient";

async function delFilm({id,_id,token,role}:IDelQuery):Promise<IUsers> {
    return apiClient.delete<IUsers>(
    `films/delOne?filmId=${_id}`,{
      headers:{
        Authorization:`Bearer ${token}`,
        "x-user":id,
        role
      }
    }).then(({data}:TAxios<IUsers>)=>data);
};

export default delFilm