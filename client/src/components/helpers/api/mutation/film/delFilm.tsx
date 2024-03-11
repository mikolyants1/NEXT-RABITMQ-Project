import { IDelQuery, IUsers } from "@/components/types/type";
import { AxiosResponse } from "axios";
import { baseUrl } from "../../baseUrl";

async function delFilm({id,_id,token,role}:IDelQuery):Promise<IUsers> {
    return await baseUrl
    .delete(`films/delOne?userId=${id}&filmId=${_id}`,{
        headers:{
            authorization:`Bearer ${token}`,
            role
        }
    })
    .then(({data}:AxiosResponse<IUsers>)=>data)
}

export default delFilm