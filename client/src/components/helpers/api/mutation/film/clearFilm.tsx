import { IUsers, IClearQuery } from "@/components/types/type";
import axios, { AxiosResponse } from "axios";
import { baseUrl } from "../../baseUrl";

async function clearFilm({id,token}:IClearQuery):Promise<IUsers> {
    return await baseUrl.delete(`films/clear?filmId=${id}`,{
        headers:{
            authorization:`Bearer ${token}`
        }
    })
    .then(({data}:AxiosResponse<IUsers>)=>data);
}

export default clearFilm