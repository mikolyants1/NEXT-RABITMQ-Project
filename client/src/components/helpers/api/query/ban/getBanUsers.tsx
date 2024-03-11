import { IBanBody, IBanUsers } from "@/components/types/type";
import { baseUrl } from "../../baseUrl";
import { AxiosResponse } from "axios";

export async function getBanUsers(body:Omit<IBanBody,"id"|"type">):Promise<IBanUsers[]> {
  return await baseUrl.get(`ban?userId=${body._id}`,{
     headers:{
        authorization:`Bearer ${body.token}`,
        role:body.role
     }
  })
  .then(({data}:AxiosResponse<IBanUsers[]>)=>data)
}