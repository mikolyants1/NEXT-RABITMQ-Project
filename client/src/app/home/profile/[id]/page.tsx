
import getUser from '@/components/helpers/api/query/user/getUser'
import { IParams, IUsers } from '@/components/types/type'
import ModalContainer from '@/components/ui/blocks/modal/ModalContainer'
import FIlmJournalCard from '@/components/ui/cards/films/film/FIlmJournalCard'
import FilmMapCard from '@/components/ui/cards/films/FilmMapCard'
import HeaderProfileCard from '@/components/ui/cards/header/HeaderProfileCard'
import { Box, Flex, Text, useDisclosure } from '@chakra-ui/react'
import Link from 'next/link'
import React, { use } from 'react'

interface props {
    params:IParams
};

function page({params}:props):JSX.Element {
 const data:IUsers = use(getUser(params.id));
 const isMaped:boolean = Boolean(data.films.length);
  return (
    <Box w='100%'
     color='white'>
      <HeaderProfileCard
       role={data.role}
       id={params.id}
      />
      <Box w='100%'
       textAlign='center'
       fontSize={25}
       fontWeight='bold'
       mt={10}>
        Hello , {data.name}
      </Box>
      <FIlmJournalCard
       isMaped={isMaped}
       />
      {isMaped&&(
       <FilmMapCard 
        data={data.films}
       />)}
    </Box>
  )
}

export default page