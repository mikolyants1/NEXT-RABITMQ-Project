
import getUser from '@/components/helpers/api/query/user/getUser'
import { IParams, IUsers } from '@/components/types/type'
import FIlmJournalCard from '@/components/ui/cards/films/film/FIlmJournalCard'
import FilmMapCard from '@/components/ui/cards/films/FilmMapCard'
import { Box, Flex } from '@chakra-ui/react'
import Link from 'next/link'
import React, { use } from 'react'

interface props {
    params:IParams
};

function page({params}:props):JSX.Element {
 const data:IUsers = use(getUser(params.id));
 console.log(data)
 const isMaped:boolean = Boolean(data.films.length);
  return (
    <Box w='100%'
     color='white'>
      {data.role == "admin" && (
        <Flex w="95%"
        justifyContent="end"
         mt={5} fontSize={25}>
          <Link href={`${params.id}/admin/${params.id}`}>
            admin panel
          </Link>
        </Flex>
      )}
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