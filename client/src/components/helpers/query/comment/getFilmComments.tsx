import { IComment } from "@/components/types/type";
import axios, { AxiosResponse } from "axios";

async function getFilmComments(id:string,userId:string,token:string):Promise<IComment[]> {
    return await axios
    .get(`http://localhost:5000/comments/film?filmID=${id}&userId=${userId}`,{
        headers:{
            authorization:`Bearer ${token}`
        }
    })
    .then(({data}:AxiosResponse<IComment[]>)=>data)
}

export default getFilmComments