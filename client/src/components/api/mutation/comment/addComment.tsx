import {type ICommBody,type IComments,type IToken,type TAxios } from "@/components/libs/types/type";
import { apiClient } from "../../apiClient";

type TArgs = ICommBody & IToken;

async function addComment(args:TArgs):Promise<IComments> {
    const {token,filmID,role,...body}:TArgs = args;
    return apiClient.post<IComments>(
    `comments/${filmID}?userId=${body.userId}`,body,{
       headers:{
         authorization:`Bearer ${token}`,
         role
       }
     })
     .then(({data}:TAxios<IComments>)=>data)
}

export default addComment