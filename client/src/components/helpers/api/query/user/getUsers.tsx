import { IUsers } from "@/components/types/type";
import { AxiosResponse } from "axios";
import { baseUrl } from "../../baseUrl";

async function getUsers():Promise<IUsers[]> {
  return await baseUrl.get('users')
  .then(({data}:AxiosResponse<IUsers[]>)=>data);
};

export default getUsers