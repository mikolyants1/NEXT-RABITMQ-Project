import {ICommBody } from '@/components/types/type'
import axios, { AxiosResponse } from 'axios'
import { baseUrl } from '../../baseUrl'

function getUserComments(id:string,token:string):Promise<ICommBody[]> {
  return baseUrl.get(`comments/user?userId=${id}`,{
     headers:{
      authorization:`Bearer ${token}`
     }
   })
   .then(({data}:AxiosResponse<ICommBody[]>)=>data)
}

export default getUserComments