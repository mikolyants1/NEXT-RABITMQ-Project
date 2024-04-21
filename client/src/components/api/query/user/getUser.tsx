import {type Axios,type IUsers } from "@/components/libs/types/type";
import { apiClient } from "../../apiClient";

async function getUser(id:string):Promise<IUsers> {
  return apiClient.get<IUsers>(`users/${id}`)
  .then(({data}:Axios<IUsers>)=>data);
};

export default getUser