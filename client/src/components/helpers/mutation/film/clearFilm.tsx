import { IUsers, IClearQuery } from "@/components/types/type";
import axios from "axios";

async function clearFilm({id,token}:IClearQuery):Promise<IUsers> {
    return await axios
    .delete(`http://localhost:5000/films/clear?filmId=${id}`,{
        headers:{
            authorization:`Bearer ${token}`
        }
    })
}

export default clearFilm