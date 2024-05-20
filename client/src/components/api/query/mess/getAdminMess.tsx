import {type TAxios,type ICheck,type IMessToAdmin } from '@/components/libs/types/type'
import { apiClient } from '../../apiClient'

async function getAdminMess(body:ICheck):Promise<IMessToAdmin[]> {
  return apiClient.get<IMessToAdmin[]>('mess',{
     headers:{
        Authorization:`Bearer ${body.token}`,
        "x-user":body._id,
        role:body.role
     }
  }).then(({data}:TAxios<IMessToAdmin[]>)=>data);
}

export default getAdminMess