import {type TAxios,type IFavorData,type IFavorFilmData,type IStore } from '@/components/libs/types/type';
import { apiClient } from '../../apiClient';

interface IProps {
   store:IStore,
   _id:string
}

export async function getFavorData({store,_id}:IProps):Promise<IFavorFilmData[]> {
   return apiClient.get<IFavorFilmData[]>(`favorite/${_id}`,{
     headers:{
        Authorization:`Bearer ${store.token}`,
        "x-user":store.id,
        role:store.role
     }
   }).then(({data}:TAxios<IFavorFilmData[]>)=>data);
}

