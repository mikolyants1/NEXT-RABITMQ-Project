import { IUsers } from "@/components/types/type";
import { AxiosResponse } from "axios";
import { baseUrl } from "../../baseUrl";

async function addUser(body:Omit<IUsers,"_id"|"films">):Promise<IUsers> {
    return await baseUrl.post('users',body)
    .then(({data}:AxiosResponse<IUsers>)=>data);
}

export default addUser