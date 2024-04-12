import { Axios, BanBody, IBanBody, IBanUsers } from "@/components/libs/types/type";
import { apiClient } from "../../apiClient";
import { AxiosResponse } from "axios";

export async function getBanUsers(body:BanBody):Promise<IBanUsers[]> {
  return apiClient.get<IBanUsers[]>(
   `ban?userId=${body._id}`,{
     headers:{
        authorization:`Bearer ${body.token}`,
        role:body.role
     }
  }).then(({data}:Axios<IBanUsers[]>)=>data);
}