import { IComment } from "@/components/types/type";
import axios, { AxiosResponse } from "axios";
import { baseUrl } from "../../baseUrl";

async function getFilmComments(id:string,userId:string,token:string):Promise<IComment[]> {
    return await baseUrl
    .get(`comments/film?filmID=${id}&userId=${userId}`,{
        headers:{
            authorization:`Bearer ${token}`
        }
    })
    .then(({data}:AxiosResponse<IComment[]>)=>data)
}

export default getFilmComments