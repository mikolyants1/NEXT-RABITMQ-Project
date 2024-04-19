import { Axios, IComment, IFilmsBody } from "@/components/libs/types/type";
import { AxiosResponse } from "axios";
import { apiClient } from "../../apiClient";

async function getFilmComments(body:IFilmsBody):Promise<IComment[]> {
    return apiClient.get<IComment[]>(
    `comments/film?filmID=${body.id}&userId=${body.userId}`,{
        headers:{
            authorization:`Bearer ${body.token}`,
            role:`${body.role}`
        }
    }).then(({data}:Axios<IComment[]>)=>data);
}

export default getFilmComments