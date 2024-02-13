import { ICommBody, IComments, IToken } from "@/components/types/type";
import axios, { AxiosResponse } from "axios";

async function addComment(args:ICommBody&IToken):Promise<IComments> {
    const {token,filmID,...body}:ICommBody&IToken = args;
    return await axios
     .post(`http://localhost:5000/comments/${filmID}`,body,{
       headers:{
         authorization:`Bearer ${token}`
       }
     })
     .then(({data}:AxiosResponse<IComments>)=>data)
}

export default addComment