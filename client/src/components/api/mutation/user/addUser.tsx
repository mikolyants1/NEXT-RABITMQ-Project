import {type TAxios,type IUsers } from "@/components/libs/types/type";
import { apiClient } from "../../apiClient";

type TBody = Omit<IUsers,"_id"|"films">;

async function addUser(body:TBody):Promise<IUsers> {
    return apiClient.post<IUsers>('users',body)
    .then(({data}:TAxios<IUsers>)=>data);
}

export default addUser