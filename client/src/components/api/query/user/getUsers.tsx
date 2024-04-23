import {type TAxios,type IUsers } from "@/components/libs/types/type";
import { apiClient } from "../../apiClient";

async function getUsers():Promise<IUsers[]> {
  return fetch("http://localhost:5000/api/users",{
    next:{revalidate:10}
  }).then(res => res.json());
};

export default getUsers