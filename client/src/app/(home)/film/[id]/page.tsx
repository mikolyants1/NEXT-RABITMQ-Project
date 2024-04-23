import getFilmById from '@/components/api/query/film/getFilmById'
import {type IFilms } from '@/components/libs/types/type'
import Error from '@/components/ui/load/Error';
import FavorGetCard from '@/components/ui/views/home/films/content/favorite/FavorGetCard';
import FilmPosterCard from '@/components/ui/views/home/films/content/poster/FilmPosterCard';
import FilmCompleteWrapper from '@/components/ui/views/home/films/FilmCompleteWrapper';
import { Box, Flex, Image } from '@chakra-ui/react';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react'

interface IParams {
  params:{
    id:string
  }
}

export const generateMetadata = async ({params}:IParams):Promise<Metadata> => {
  const film:IFilms = await getFilmById(params.id);
  return {
    title:film.Title,
    description:`Information of film "${film.Title}"`
  }
}

async function page({params:{id}}:IParams):Promise<JSX.Element> {
  const film = await getFilmById(id);
  const values:string[] = [
    film.Actors,
    film.Director,
    film.Released
  ]
  return (
    <FilmCompleteWrapper>
       <FavorGetCard film={film} />
       <Flex w='90%' m='40px auto'
        justifyContent='space-around'>
          <Image 
           w={260} h={320}
           src={film.Poster}
           borderRadius={10}
          />
          <Box>
           <Box w='100%'
            textAlign='center'
            fontSize={32}>
              {film.Title} 
           </Box>
           {values.map((i:string):JSX.Element=>(
             <FilmPosterCard key={i} item={i} />
           ))}
         </Box>
       </Flex>
       <Box w='90%'
        textAlign='center'
        borderTop='1px solid white'
        m='10px auto'
        pt={5}>
          {film.Plot}
       </Box>
       <Box w='100%'
        textAlign='center'>
         <Link href={`/comments/film/${id}`}>
            Comments 
         </Link>
       </Box>
    </FilmCompleteWrapper>
  )
}

export default page