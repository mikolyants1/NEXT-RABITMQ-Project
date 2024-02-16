import {ICommBody } from '@/components/types/type'
import axios, { AxiosResponse } from 'axios'

function getUserComments(id:string,token:string):Promise<ICommBody[]> {
  return axios
   .get(`http://localhost:5000/comments/user?userId=${id}`,{
     headers:{
      authorization:`Bearer ${token}`
     }
   })
   .then(({data}:AxiosResponse<ICommBody[]>)=>data)
}

export default getUserComments