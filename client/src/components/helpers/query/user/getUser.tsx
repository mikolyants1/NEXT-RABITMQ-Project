import axios, { AxiosResponse } from "axios";
import { IUsers } from "../../../types/type";

async function getUser(id:string):Promise<IUsers> {
  return await axios
  .get(`http://localhost:5000/users/${id}`)
  .then(({data}:AxiosResponse<IUsers>)=>data);
};

export default getUser