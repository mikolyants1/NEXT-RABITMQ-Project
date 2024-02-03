
import getFilmById from '@/components/helpers/query/film/getFilmById'
import { IFilms, IParams } from '@/components/types/type'
import FilmPosterCard from '@/components/ui/cards/films/film/FilmPosterCard';
import FilmCompleteWrapper from '@/components/ui/wrappers/FilmCompleteWrapper';
import { Box, Flex, Image } from '@chakra-ui/react';
import React from 'react'

interface props {
    params:IParams
};

async function page({params}:props):Promise<JSX.Element> {
 const film:IFilms = await getFilmById(params.id);
 const {Actors,Director,Plot,Poster,Released,Title}:IFilms = film;
 const values:string[] = [Actors,Director,Released];

  return (
    <FilmCompleteWrapper>
       <Flex w='90%'
        justifyContent='space-around'
        m='10px auto'>
          <Image 
           w={260} h={320}
           src={Poster}
           borderRadius={10}
          />
          <Box>
           <Box w='100%'
            textAlign='center'
            fontSize={32}>
               {Title} 
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
          {Plot}
       </Box>
    </FilmCompleteWrapper>
  )
}

export default page