import { ICheck, IMessBody, IMessToAdmin } from '@/components/types/type'
import { baseUrl } from '../../baseUrl'
import { AxiosResponse } from 'axios'

async function delAdminMess(body:ICheck&{id:string}):Promise<IMessToAdmin> {
  return await baseUrl.delete(`mess/${body.id}?userId=${body._id}`,{
     headers:{
        authorization:`Bearer ${body.token}`,
        role:body.role
     }
  })
  .then(({data}:AxiosResponse<IMessToAdmin>)=>data);
}

export default delAdminMess