import { IFilms } from '@/components/types/type'
import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import FilmMapCard from '../films/FilmMapCard'

interface props {
  name:string,
  films:IFilms[],
};

function UserCard({name,films}:props):JSX.Element {
  return (
    <Box w='100%' mt={10}>
      <Box w='100%'
       pt={2} pb={2}
       textAlign='center'
       fontWeight='bold'
       borderTop='1px solid white'
       borderBottom='1px solid white'
       fontSize={30}
       color='white'>
          {name} {" "}
      </Box>
      <FilmMapCard data={films} />
    </Box>
  )
}

export default UserCard