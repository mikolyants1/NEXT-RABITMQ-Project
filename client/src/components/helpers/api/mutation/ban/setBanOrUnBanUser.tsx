import { IBanBody, IBanUsers } from '@/components/types/type'
import { baseUrl } from '../../baseUrl'
import { AxiosResponse } from 'axios';

async function setBanOrUnBanUser(body:IBanBody):Promise<IBanUsers[]> {
  const {id,token,type,_id,role}:IBanBody = body;
  return await baseUrl.post(`ban?userId=${_id}`,{id,type},{
     headers:{
        authorization:`Bearer ${token}`,
        role
     }
  })
  .then(({data}:AxiosResponse<IBanUsers[]>)=>data);
}

export default setBanOrUnBanUser