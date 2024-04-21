
import getUser from '@/components/api/query/user/getUser'
import {type IParams,type IUsers } from '@/components/libs/types/type'
import FIlmJournalCard from '@/components/ui/views/home/profile/journal/FIlmJournalCard'
import FilmMapCard from '@/components/ui/cards/films/FilmMapCard'
import HeaderProfileCard from '@/components/ui/views/home/profile/header/HeaderProfileCard'
import { Box } from '@chakra-ui/react'
import { use } from 'react'

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