import {type ICommBody,type IComments,type IToken,type TAxios } from "@/components/libs/types/type";
import { apiClient } from "../../apiClient";

type TArgs = ICommBody & IToken;

async function addComment(args:TArgs):Promise<IComments> {
    const {token,filmID,role,...body}:TArgs = args;
    return apiClient.post<IComments>(
      `comments/${filmID}`,body,{
       headers:{
         Authorization:`Bearer ${token}`,
         "x-user":body.userId,
         role
       }
     })
     .then(({data}:TAxios<IComments>)=>data)
}

export default addComment