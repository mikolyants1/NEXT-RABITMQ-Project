import { Axios, IUsers } from "@/components/libs/types/type";
import { apiClient } from "../../apiClient";

async function getUsers():Promise<IUsers[]> {
  return apiClient.get<IUsers[]>('users')
  .then(({data}:Axios<IUsers[]>)=>data);
};

export default getUsers