import {type TAxios,type ICheck,type IUsers } from "@/components/libs/types/type";
import { apiClient } from "../../apiClient";

type TBody = Omit<IUsers,"_id"|"films">

async function checkUsers(body:TBody):Promise<ICheck> {
  return apiClient.post<ICheck>('check',body)
  .then(({data}:TAxios<ICheck>)=>data);
};

export default checkUsers