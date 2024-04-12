import { ICommBody, IComments, IToken } from "@/components/libs/types/type";
import { AxiosResponse } from "axios";
import { apiClient } from "../../apiClient";

async function addComment(args:ICommBody&IToken):Promise<IComments> {
    const {token,filmID,role,...body}:ICommBody&IToken = args;
    return apiClient.post<IComments>(
    `comments/${filmID}?userId=${body.userId}`,body,{
       headers:{
         authorization:`Bearer ${token}`,
         role
       }
     })
     .then(({data}:AxiosResponse<IComments>)=>data)
}

export default addComment