import {type TAxios, type ICommDelBody,type IComments } from "@/components/libs/types/type";
import { apiClient } from "../../apiClient";

async function delComment({id,time,token,userId,role}:ICommDelBody):Promise<IComments> {
    return apiClient.delete<IComments>(
    `comments/${id}?time=${time}&userId=${userId}`,{
        headers:{
            authorization:`Bearer ${token}`,
            role
        },
    })
    .then(({data}:TAxios<IComments>)=>data);

}

export default delComment