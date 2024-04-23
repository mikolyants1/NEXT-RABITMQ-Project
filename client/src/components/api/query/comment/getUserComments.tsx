import {type TAxios,type ICommBody,type IFilmsBody } from '@/components/libs/types/type'
import {type AxiosResponse } from 'axios'
import { apiClient } from '../../apiClient'

function getUserComments(body:IFilmsBody):Promise<ICommBody[]> {
  return apiClient.get<ICommBody[]>(
  `comments/user?userId=${body.id}`,{
     headers:{
      authorization:`Bearer ${body.token}`,
      role:`${body.role}`
     }
   }).then(({data}:TAxios<ICommBody[]>)=>data);
}

export default getUserComments