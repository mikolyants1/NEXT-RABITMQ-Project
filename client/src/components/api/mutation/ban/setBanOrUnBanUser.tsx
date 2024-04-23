import {type TAxios,type IBanBody,type IBanUsers } from '@/components/libs/types/type'
import { apiClient } from '../../apiClient'
import {type AxiosResponse } from 'axios';

async function setBanOrUnBanUser(body:IBanBody):Promise<IBanUsers[]> {
  const {id,token,type,_id,role}:IBanBody = body;
  return apiClient.post<IBanUsers[]>(
   `ban?userId=${_id}`,{id,type},{
     headers:{
        authorization:`Bearer ${token}`,
        role
     }
  }).then(({data}:TAxios<IBanUsers[]>)=>data);
}

export default setBanOrUnBanUser