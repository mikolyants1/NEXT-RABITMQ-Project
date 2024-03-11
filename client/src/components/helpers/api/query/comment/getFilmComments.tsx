import { IComment, IFilmsBody } from "@/components/types/type";
import axios, { AxiosResponse } from "axios";
import { baseUrl } from "../../baseUrl";

async function getFilmComments(body:IFilmsBody):Promise<IComment[]> {
    return await baseUrl
    .get(`comments/film?filmID=${body.id}&userId=${body.userId}`,{
        headers:{
            authorization:`Bearer ${body.token}`,
            role:`${body.role}`
        }
    })
    .then(({data}:AxiosResponse<IComment[]>)=>data)
}

export default getFilmComments