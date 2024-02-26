import { ICheck, IUsers } from "@/components/types/type";
import { AxiosResponse } from "axios";
import { baseUrl } from "../../baseUrl";

async function checkUsers(body:Omit<IUsers,"_id"|"films">):Promise<ICheck> {
  return await baseUrl.post('check',body)
  .then(({data}:AxiosResponse<ICheck>)=>data);
};

export default checkUsers