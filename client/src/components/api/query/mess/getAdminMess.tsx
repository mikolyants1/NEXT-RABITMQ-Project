import { Axios, ICheck, IMessToAdmin } from '@/components/libs/types/type'
import { apiClient } from '../../apiClient'

async function getAdminMess(body:ICheck):Promise<IMessToAdmin[]> {
  return apiClient.get<IMessToAdmin[]>(
   `mess?userId=${body._id}`,{
     headers:{
        authorization:`Bearer ${body.token}`,
        role:body.role
     }
  }).then(({data}:Axios<IMessToAdmin[]>)=>data);
}

export default getAdminMess