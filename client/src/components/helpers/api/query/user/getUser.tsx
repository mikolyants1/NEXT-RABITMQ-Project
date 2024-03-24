import { IUsers } from "@/components/types/type";
import { AxiosResponse } from "axios";
import { baseUrl } from "../../baseUrl";

async function getUser(id:string):Promise<IUsers> {
  return await baseUrl.get(`users/${id}`)
  .then(({data})=>data);
};

export default getUser