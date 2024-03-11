import { ICheck, IMessToAdmin } from '@/components/types/type'
import { baseUrl } from '../../baseUrl'
import { AxiosResponse } from 'axios'

async function getAdminMess(body:ICheck):Promise<IMessToAdmin[]> {
  return await baseUrl.get(`mess?userId=${body._id}`,{
     headers:{
        authorization:`Bearer ${body.token}`,
        role:body.role
     }
  })
  .then(({data}:AxiosResponse<IMessToAdmin[]>)=>data);
}

export default getAdminMess