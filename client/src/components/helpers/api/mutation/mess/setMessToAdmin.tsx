import { IMessBody, IMessToAdmin } from '@/components/types/type'
import { baseUrl } from '../../baseUrl'
import { AxiosResponse } from 'axios';

async function setMessToAdmin(arg:IMessBody):Promise<IMessToAdmin[]> {
  const {token,_id,role,...body}:IMessBody = arg;
  return await baseUrl.post(`mess?userId=${_id}`,body,{
     headers:{
        authorization:`Bearer ${token}`,
        role
     }
  })
  .then(({data}:AxiosResponse<IMessToAdmin[]>)=>data)
}

export default setMessToAdmin