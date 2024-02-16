import {ICommBody } from '@/components/types/type'
import axios, { AxiosResponse } from 'axios'

function getUserComments(id:string):Promise<ICommBody[]> {
  return axios
   .get(`http://localhost:5000/comments/user?userId=${id}`)
   .then(({data}:AxiosResponse<ICommBody[]>)=>data)
}

export default getUserComments