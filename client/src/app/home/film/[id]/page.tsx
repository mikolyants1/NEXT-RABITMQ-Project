
import getFilmById from '@/components/helpers/api/query/film/getFilmById'
import { IFilms, IParams } from '@/components/types/type'
import FilmPosterCard from '@/components/ui/cards/films/film/FilmPosterCard';
import FilmCompleteWrapper from '@/components/ui/wrappers/film/FilmCompleteWrapper';
import { Box, Flex, Image } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react'

interface props {
    params:IParams
};

async function page({params:{id}}:props):Promise<JSX.Element> {
 const film:IFilms = await getFilmById(id);
 const values:string[] = [
  film.Actors,
  film.Director,
  film.Released
 ];

  return (
    <FilmCompleteWrapper>
       <Flex w='90%'
        justifyContent='space-around'
        m='10px auto'>
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
             <FilmPosterCard
              key={i}
              item={i}
             />
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
         <Link href={`/home/comments/film/${id}`}>
            Comments 
         </Link>
       </Box>
    </FilmCompleteWrapper>
  )
}

export default page