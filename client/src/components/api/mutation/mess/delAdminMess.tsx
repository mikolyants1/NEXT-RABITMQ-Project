import {type Axios,type ICheck,type IMessBody,type IMessToAdmin } from '@/components/libs/types/type'
import { apiClient } from '../../apiClient'

async function delAdminMess(body:ICheck&{id:string}):Promise<IMessToAdmin> {
  return apiClient.delete<IMessToAdmin>(
   `mess/${body.id}?userId=${body._id}`,{
     headers:{
        authorization:`Bearer ${body.token}`,
        role:body.role
     }
  }).then(({data}:Axios<IMessToAdmin>)=>data);
}

export default delAdminMess