import { IComment } from "@/components/types/type";
import axios, { AxiosResponse } from "axios";

async function getFilmComments(id:string):Promise<IComment[]> {
    return await axios
    .get(`http://localhost:5000/comments/film?filmID=${id}`)
    .then(({data}:AxiosResponse<IComment[]>)=>data)
}

export default getFilmComments