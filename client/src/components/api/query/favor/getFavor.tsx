import { Axios, IFavorData, IStore } from '@/components/libs/types/type';
import { apiClient } from '../../apiClient';
import { AxiosResponse } from 'axios';

interface IProps {
   store:IStore
}

export async function getFavorData({store}:IProps):Promise<IFavorData[]> {
   const {role,id,token}:IStore = store;
   return apiClient.get<IFavorData[]>(`favorite/?userId=${id}`,{
     headers:{
        authorization:`Bearer ${token}`,
        role
     }
   }).then(({data}:Axios<IFavorData[]>)=>data);
}

