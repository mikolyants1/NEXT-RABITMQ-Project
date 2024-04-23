
import {type TAxios,type IMessBody,type IStateMess } from '@/components/libs/types/type'
import { apiClient } from '../../apiClient'

async function setMessToAdmin(args:IMessBody):Promise<IStateMess> {
  const {_id,token,role,...body}:IMessBody = args;
  return apiClient.post<IStateMess>(
    `mess?userId=${_id}`,body,{
     headers:{
      authorization:`Bearer ${token}`,
      role
     }
  }).then(({data}:TAxios<IStateMess>)=>data);
}

export default setMessToAdmin