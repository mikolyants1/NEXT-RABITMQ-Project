
import { IMessBody } from '@/components/types/type'
import { baseUrl } from '../../baseUrl'

async function setMessToAdmin(args:IMessBody):Promise<void> {
  const {_id,token,role,...body}:IMessBody = args;
  return await baseUrl.post(`mess?userId=${_id}`,body,{
     headers:{
      authorization:`Bearer ${token}`,
      role
     }
  })
}

export default setMessToAdmin