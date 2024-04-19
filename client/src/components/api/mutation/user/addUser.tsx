import { Axios, IUsers } from "@/components/libs/types/type";
import { AxiosResponse } from "axios";
import { apiClient } from "../../apiClient";

async function addUser(body:Omit<IUsers,"_id"|"films">):Promise<IUsers> {
    return apiClient.post<IUsers>('users',body)
    .then(({data}:Axios<IUsers>)=>data);
}

export default addUser