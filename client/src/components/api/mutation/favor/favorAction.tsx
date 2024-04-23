import {type TAxios,type IFavorBody,type IFavorData } from "@/components/libs/types/type";
import { apiClient } from "../../apiClient";


export async function favorAction(body:IFavorBody):Promise<IFavorData> {
    const {store,film,type}:IFavorBody = body;
    return apiClient.post<IFavorData>(
     `favorite/add?userId=${store.id}`,{...film,type},{
        headers:{
          authorization:`Bearer ${store.token}`,
          role:store.role
        }
    }).then(({data}:TAxios<IFavorData>)=>data);
}