import { IDelQuery, IUsers } from "@/components/libs/types/type";
import { apiClient } from "../../apiClient";
import { Axios } from "../../../libs/types/type";

async function delFilm({id,_id,token,role}:IDelQuery):Promise<IUsers> {
    return apiClient.delete<IUsers>(
    `films/delOne?userId=${id}&filmId=${_id}`,{
        headers:{
          authorization:`Bearer ${token}`,
          role
        }
    }).then(({data}:Axios<IUsers>)=>data);
};

export default delFilm