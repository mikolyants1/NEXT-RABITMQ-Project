import { IUsers, IClearQuery } from "@/components/types/type";
import { AxiosResponse } from "axios";
import { baseUrl } from "../../baseUrl";

async function clearFilm({id,token,role}:IClearQuery):Promise<IUsers> {
    return await baseUrl
    .delete(`films/clear?userId=${id}`,{
        headers:{
            authorization:`Bearer ${token}`,
            role
        }
    })
    .then(({data}:AxiosResponse<IUsers>)=>data);
}

export default clearFilm