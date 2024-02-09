import { IDelQuery, IUsers } from "@/components/types/type";
import axios from "axios";

async function delFilm({id,_id,token}:IDelQuery):Promise<IUsers> {
    return await axios
    .delete(`http://localhost:5000/films/delOne?userId=${id}&filmId=${_id}`,{
        headers:{
            authorization:`Bearer ${token}`
        }
    })
}

export default delFilm