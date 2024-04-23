import {type TAxios,type BanBody,type IBanBody,type IBanUsers } from "@/components/libs/types/type";
import { apiClient } from "../../apiClient";

export async function getBanUsers(body:BanBody):Promise<IBanUsers[]> {
  return apiClient.get<IBanUsers[]>(
   `ban?userId=${body._id}`,{
     headers:{
        authorization:`Bearer ${body.token}`,
        role:body.role
     }
  }).then(({data}:TAxios<IBanUsers[]>)=>data);
}