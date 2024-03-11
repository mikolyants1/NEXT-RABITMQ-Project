import {ICommBody, IFilmsBody } from '@/components/types/type'
import { AxiosResponse } from 'axios'
import { baseUrl } from '../../baseUrl'

function getUserComments(body:IFilmsBody):Promise<ICommBody[]> {
  return baseUrl.get(`comments/user?userId=${body.id}`,{
     headers:{
      authorization:`Bearer ${body.token}`,
      role:`${body.role}`
     }
   })
   .then(({data}:AxiosResponse<ICommBody[]>)=>data)
}

export default getUserComments