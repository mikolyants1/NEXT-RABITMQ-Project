import { ICommDelBody, IComments } from "@/components/libs/types/type";
import { AxiosResponse } from "axios";
import { apiClient } from "../../apiClient";

async function delComment({id,time,token,userId,role}:ICommDelBody):Promise<IComments> {
    return apiClient.delete<IComments>(
    `comments/${id}?time=${time}&userId=${userId}`,{
        headers:{
            authorization:`Bearer ${token}`,
            role
        },
    })
    .then(({data}:AxiosResponse<IComments>)=>data);

}

export default delComment