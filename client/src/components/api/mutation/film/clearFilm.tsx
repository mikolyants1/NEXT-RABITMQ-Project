import {type IUsers,type IClearQuery,type TAxios } from "@/components/libs/types/type";
import { apiClient } from "../../apiClient";

async function clearFilm({id,token,role}:IClearQuery):Promise<IUsers> {
    return apiClient.delete<IUsers>(
    `films/clear?userId=${id}`,{
        headers:{
            authorization:`Bearer ${token}`,
            role
        }
    }).then(({data}:TAxios<IUsers>)=>data);
}

export default clearFilm