import {type TAxios,type ICheck,type IMessBody,type IMessToAdmin } from '@/components/libs/types/type'
import { apiClient } from '../../apiClient'

type TBody = ICheck & {id:string};

async function delAdminMess(body:TBody):Promise<IMessToAdmin> {
  return apiClient.delete<IMessToAdmin>(
   `mess/${body.id}?userId=${body._id}`,{
     headers:{
        authorization:`Bearer ${body.token}`,
        role:body.role
     }
  }).then(({data}:TAxios<IMessToAdmin>)=>data);
}

export default delAdminMess