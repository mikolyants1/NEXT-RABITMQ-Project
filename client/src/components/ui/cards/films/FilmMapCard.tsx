'use client'

import { IFilms } from '@/components/types/type'
import { Box, Flex } from '@chakra-ui/react'
import React, { useContext } from 'react'
import FilmCard from './film/FilmCard'
import ClearJournalButton from '../../buttons/film/ClearJournalButton';
import { DelContext } from '@/components/providers/ReactDelLayout';

interface props {
    data:IFilms[];
};

function FilmMapCard({data}:props):JSX.Element {
  const isDel = useContext<boolean>(DelContext);
  return (
     <>
      <Flex w='100%'
       alignItems='center'
       flexWrap='wrap'
       justifyContent='center'
       gap={10}>
        {data.map((i:IFilms):JSX.Element=>(
         <FilmCard
          key={i._id}
          data={i}
          />
        ))}
      </Flex>
      {isDel&&<ClearJournalButton />}
    </>
  )
}

export default FilmMapCard