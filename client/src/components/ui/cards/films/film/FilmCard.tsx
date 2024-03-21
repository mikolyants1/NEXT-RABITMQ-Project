'use client'

import { IFilms, IStore, IToken} from '@/components/types/type'
import React, { memo, useContext } from 'react'
import { Box ,Image} from '@chakra-ui/react';
import FilmCardWrapper from '@/components/ui/wrappers/film/FilmCardWrapper';
import { useStore } from '@/components/store/store';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import addFilm from '@/components/helpers/api/mutation/film/addFilm';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import checkFilmId from '@/components/helpers/api/query/film/checkFilmId';
import DelFilmButton from '@/components/ui/buttons/film/DelFilmButton';
import { DelContext } from '@/components/providers/ReactDelLayout';
import createRows from '@/components/helpers/functions/create/maps/rows';

interface props {
    data:IFilms;
    i?:number
};

function FilmCard({data,i}:props):JSX.Element {
  const {_id,...body}:IFilms = data;
  const rows:string[] = createRows(data);
  const isDel = useContext<boolean>(DelContext);
  const router:AppRouterInstance = useRouter();
  const {invalidateQueries}:QueryClient = useQueryClient();
  const {id:userId,token,role}:IStore = useStore();
  const {mutate:setFilm} = useMutation<unknown,IFilms,IFilms&IToken>({
    mutationFn:(date:IFilms&IToken)=>addFilm(date),
    onSuccess:()=>invalidateQueries({queryKey:['films']})
  });
  
  const add = async ():Promise<void> => {
    const isAdded:boolean = await checkFilmId(data.imdbID,userId);
    if (!isAdded) setFilm({_id:userId,token,role,...body});
    router.push(`/home/film/${data.imdbID}`);
  };
  
  return (
    <FilmCardWrapper delay={i ? i : 0}>
      <>
        {isDel&&<DelFilmButton _id={_id} />}
      </>
      <Image m='auto'
       w={180} h={240}
       borderRadius={10}
       src={data.Poster}
       alt=''
       />
       <Box w={200}
        onClick={add}>
         <Box w='100%'
          fontSize={20}
          textAlign='center'>
           {data.Title}
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