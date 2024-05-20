import {type TAxios,type TBanBody,type IBanBody,type IBanUsers } from "@/components/libs/types/type";
import { apiClient } from "../../apiClient";

export async function getBanUsers(body:TBanBody):Promise<IBanUsers[]> {
  return apiClient.get<IBanUsers[]>('ban',{
     headers:{
        Authorization:`Bearer ${body.token}`,
        role:body.role,
        "x-user":body._id
     }
  }).then(({data}:TAxios<IBanUsers[]>)=>data);
}