'use client'

import { IFilms} from '@/components/types/type'
import React, { memo, useCallback } from 'react'
import { Box ,Image} from '@chakra-ui/react';
import FilmCardWrapper from '@/components/ui/wrappers/FilmCardWrapper';
import { useStore } from '@/components/store/store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import addFilm from '@/components/helpers/query/film/addFilm';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import checkFilmId from '@/components/helpers/query/film/checkFilmId';

interface props {
    data:IFilms
}
function FilmCard({data}:props):JSX.Element {
  const {Title,Poster,Released,Actors,Director,imdbID,Plot}:IFilms = data;
  const rows:string[] = [Released,Director,Actors];
  const router:AppRouterInstance = useRouter();
  const {invalidateQueries} = useQueryClient();
  const {id:_id} = useStore();
  const {mutate} = useMutation({
  mutationFn:(date:IFilms)=>addFilm(date),
  onSuccess:()=>invalidateQueries({queryKey:['films']})
  });

  const add = useCallback(async ():Promise<void> => {
    const isAdded:boolean = await checkFilmId(imdbID,_id);
    if (!isAdded){
      mutate({_id,Title,Released,Actors,Director,imdbID,Plot,Poster});
    };
    router.push(`/home/film/${imdbID}`);
  },[]);

  return (
    <FilmCardWrapper add={add}>
      <Image m='auto'
       w={180} h={240}
       borderRadius={10}
       src={Poster}
       alt=''
       />
       <Box w={200}>
         <Box w='100%'
          fontSize={20}
          textAlign='center'>
           {Title}
         </Box>
         {rows.map((i:string):JSX.Element=>(
          <Box key={i} w='100%'
           textAlign='center'>
              {i}
          </Box>
         ))}
       </Box>
    </FilmCardWrapper>
  )
}

export default memo(FilmCard)