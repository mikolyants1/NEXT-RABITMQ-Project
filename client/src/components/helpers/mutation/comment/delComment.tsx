import { ICommDelBody, IComments } from "@/components/types/type";
import axios, { AxiosResponse } from "axios";

async function delComment({id,time,token,userId}:ICommDelBody):Promise<IComments> {
    return await axios
    .delete(`http://localhost:5000/comments/${id}?time=${time}&userId=${userId}`,{
        headers:{
            authorization:`Bearer ${token}`
        }
    })
    .then(({data}:AxiosResponse<IComments>)=>data);

}

export default delComment