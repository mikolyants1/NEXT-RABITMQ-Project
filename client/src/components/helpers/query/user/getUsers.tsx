import axios, { AxiosResponse } from "axios";
import { IUsers } from "../../../types/type";

async function getUsers():Promise<IUsers[]> {
  return await axios.get('http://localhost:5000/users')
  .then(({data}:AxiosResponse<IUsers[]>)=>data);
};

export default getUsers