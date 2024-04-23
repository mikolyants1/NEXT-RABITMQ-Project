import {type TAxios,type IFavorData,type IFavorFilmData,type IStore } from '@/components/libs/types/type';
import { apiClient } from '../../apiClient';

interface IProps {
   store:IStore,
   _id:string
}

export async function getFavorData({store,_id}:IProps):Promise<IFavorFilmData[]> {
   const {role,id,token}:IStore = store;
   return apiClient.get<IFavorFilmData[]>(
    `favorite/${_id}?userId=${id}`,{
     headers:{
        authorization:`Bearer ${token}`,
        role
     }
   }).then(({data}:TAxios<IFavorFilmData[]>)=>data);
}

