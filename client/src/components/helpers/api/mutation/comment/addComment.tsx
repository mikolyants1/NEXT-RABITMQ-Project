import { ICommBody, IComments, IToken } from "@/components/types/type";
import { AxiosResponse } from "axios";
import { baseUrl } from "../../baseUrl";

async function addComment(args:ICommBody&IToken):Promise<IComments> {
    const {token,filmID,role,...body}:ICommBody&IToken = args;
    return await baseUrl
     .post(`comments/${filmID}?userId=${body.userId}`,body,{
       headers:{
         authorization:`Bearer ${token}`,
         role
       }
     })
     .then(({data}:AxiosResponse<IComments>)=>data)
}

export default addComment