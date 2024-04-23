import {type TAxios, type IDelQuery,type IUsers } from "@/components/libs/types/type";
import { apiClient } from "../../apiClient";

async function delFilm({id,_id,token,role}:IDelQuery):Promise<IUsers> {
    return apiClient.delete<IUsers>(
    `films/delOne?userId=${id}&filmId=${_id}`,{
        headers:{
          authorization:`Bearer ${token}`,
          role
        }
    }).then(({data}:TAxios<IUsers>)=>data);
};

export default delFilm