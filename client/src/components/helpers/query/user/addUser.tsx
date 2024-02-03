import { IUsers } from "@/components/types/type";
import axios, { AxiosResponse } from "axios";

async function addUser(body:Omit<IUsers,"_id"|"films">):Promise<IUsers> {
    return await axios
    .post('http://localhost:5000/users',body)
    .then(({data}:AxiosResponse<IUsers>)=>data);
}

export default addUser