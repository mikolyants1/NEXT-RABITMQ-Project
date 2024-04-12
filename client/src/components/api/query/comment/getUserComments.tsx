import {Axios, ICommBody, IFilmsBody } from '@/components/libs/types/type'
import { AxiosResponse } from 'axios'
import { apiClient } from '../../apiClient'

function getUserComments(body:IFilmsBody):Promise<ICommBody[]> {
  return apiClient.get<ICommBody[]>(
  `comments/user?userId=${body.id}`,{
     headers:{
      authorization:`Bearer ${body.token}`,
      role:`${body.role}`
     }
   }).then(({data}:Axios<ICommBody[]>)=>data);
}

export default getUserComments