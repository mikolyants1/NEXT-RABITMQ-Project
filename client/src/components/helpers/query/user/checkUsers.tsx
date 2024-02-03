import axios, { AxiosResponse } from "axios";
import { IUsers } from "../../../types/type";

async function checkUsers(body:Omit<IUsers,"_id"|"films">):Promise<{_id:string}> {
  return await axios.post('http://localhost:5000/check',body)
  .then(({data}:AxiosResponse<{_id:string}>)=>data);
};

export default checkUsers