"use client"

import { getFavorData } from '@/components/api/query/favor/getFavor';
import { useStore } from '@/components/model/store/store';
import {type IFavorFilmData,type IFilms,type IStore } from '@/components/libs/types/type';
import { useQuery } from '@tanstack/react-query';
import {memo} from 'react'
import SetFavorButton from './buttons/SetFavorButton';
import Error from '@/components/ui/load/Error';
import Loading from '@/components/ui/load/Loading';

interface IProps {
  film:IFilms
}

function FavorGetCard({film}:IProps):JSX.Element {
  const store:IStore = useStore();
  const {isError,isLoading,data} = useQuery<IFavorFilmData[]>({
    queryKey:["favor"],
    queryFn:()=>getFavorData({
      store,
      _id:store.id
    })
  })

  if (isLoading) return <Loading />;
  if (isError || !data) return <Error />;
  
  return (
    <SetFavorButton
     favorFilms={data}
     film={film}
    />
  )
}

export default memo(FavorGetCard);