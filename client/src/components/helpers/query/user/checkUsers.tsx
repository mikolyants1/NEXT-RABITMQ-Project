import axios, { AxiosResponse } from "axios";
import { ICheck, IUsers } from "../../../types/type";

async function checkUsers(body:Omit<IUsers,"_id"|"films">):Promise<ICheck> {
  return await axios
  .post('http://localhost:5000/check',body)
  .then(({data}:AxiosResponse<ICheck>)=>data);
};

export default checkUsers