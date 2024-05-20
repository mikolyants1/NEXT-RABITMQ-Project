import {type TAxios,type ICommBody,type IFilmsBody } from '@/components/libs/types/type'
import {type AxiosResponse } from 'axios'
import { apiClient } from '../../apiClient'

function getUserComments(body:IFilmsBody):Promise<ICommBody[]> {
  return apiClient.get<ICommBody[]>('comments/user',{
     headers:{
      Authorization:`Bearer ${body.token}`,
      "x-user":body.id,
      role:`${body.role}`
     }
   }).then(({data}:TAxios<ICommBody[]>)=>data);
}

export default getUserComments