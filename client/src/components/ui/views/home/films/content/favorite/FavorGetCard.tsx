"use client"

import { getFavorData } from '@/components/api/query/favor/getFavor';
import { useStore } from '@/components/model/store/store';
import { IFavorData, IFilms, IStore } from '@/components/libs/types/type';
import { useQuery } from '@tanstack/react-query';
import {memo} from 'react'
import SetFavorButton from './buttons/SetFavorButton';
import { Box } from '@chakra-ui/react';
import Error from '@/components/ui/load/Error';

interface IProps {
    film:IFilms
}
function FavorGetCard({film}:IProps):JSX.Element {
  const store:IStore = useStore();
  const {isError,isLoading,data} = useQuery<IFavorData[]>({
    queryKey:["favor"],
    queryFn:()=>getFavorData({store})
  })

  if (isLoading) return <Box>...</Box>;
  if (isError || !data) return <Error />;
  
  return (
    <SetFavorButton
     favorFilms={data}
     film={film}
    />
  )
}

export default memo(FavorGetCard);