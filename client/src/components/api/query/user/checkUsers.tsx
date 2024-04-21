import {type Axios,type ICheck,type IUsers } from "@/components/libs/types/type";
import { apiClient } from "../../apiClient";

async function checkUsers(body:Omit<IUsers,"_id"|"films">):Promise<ICheck> {
  return apiClient.post<ICheck>('check',body)
  .then(({data}:Axios<ICheck>)=>data);
};

export default checkUsers