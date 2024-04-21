'use client'

import {type IFilms,type IStore,type IToken} from '@/components/libs/types/type'
import { memo, useContext } from 'react'
import { Box,Image} from '@chakra-ui/react';
import { useStore } from '@/components/model/store/store';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import addFilm from '@/components/api/mutation/film/addFilm';
import {type AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import checkFilmId from '@/components/api/query/film/checkFilmId';
import DelFilmButton from '@/components/ui/cards/films/content/wrappers/buttons/DelFilmButton';
import createRows from '@/components/libs/create/maps/rows';
import { DelContext } from '@/components/model/context/DelContext';
import { FilmWrapper } from '@/components/libs/style/animation';

interface props {
    data:IFilms,
    move?:number
};

function FilmCard({data,move}:props):JSX.Element {
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
  console.log(move)
  const add = async ():Promise<void> => {
    const isAdded:boolean = await checkFilmId(data.imdbID,userId);
    if (!isAdded) setFilm({_id:userId,token,role,...body});
    router.push(`/film/${data.imdbID}`);
  };
  
  return (
    <FilmWrapper
     move={move ? move : 0}>
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
    </FilmWrapper>
  )
}

export default memo(FilmCard)