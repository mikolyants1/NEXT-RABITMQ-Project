
import { IStore, Null } from '@/components/types/type'
import { baseUrl } from '../../baseUrl'
import { schema } from '@/components/helpers/functions/compare/zodValid';

async function setMessToAdmin(store:IStore,formData:FormData):Promise<void> {
  const {token,id:_id,role,name:user}:IStore = store;
  const text:Null<FormDataEntryValue> = formData.get("text");
  const description:Null<FormDataEntryValue> = formData.get("description");
  const fields = schema.safeParse({text,description});

  if (!fields.success){
   console.log(fields.error.flatten().fieldErrors)
   return;
  };
  
  await baseUrl.post(`mess?userId=${_id}`,{
   user,
   text,
   description
  },{
     headers:{
      authorization:`Bearer ${token}`,
      role
     }
  })
}

export default setMessToAdmin