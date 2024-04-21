'use client'

import {type IFilms } from '@/components/libs/types/type'
import { Box, Flex } from '@chakra-ui/react'
import { useContext, useEffect, useOptimistic, useRef, useState } from 'react'
import FilmCard from './content/FilmCard'
import { DelContext } from '@/components/model/context/DelContext'
import { OptimisticContext } from '@/components/model/context/OptimisticContext'
import { optimisticAction } from '@/components/model/actions/optimistic/optimisticAction'
import MoveCard from './content/MoveCard'
import { autoAbsolute } from '@/components/libs/style/animation'

interface props {
    data:IFilms[];
};

function FilmMapCard({data}:props):JSX.Element {
  const isDel = useContext<boolean>(DelContext);
  const [move,setMove] = useState<number>(0);
  const [optimistic,setOptimistic] = useOptimistic(data,optimisticAction);
  return (
     <OptimisticContext.Provider
      value={{optimistic:setOptimistic}}> 
        <Box w="100%" h={300}
         position="relative">
          {isDel&&(
          <MoveCard
           move={move}
           setMove={setMove}
           length={data.length}
           />)}
            <Flex w={400} h={300}
             position="absolute"
             alignItems='center'
             columnGap={150}
             {...autoAbsolute} >
             {optimistic.map((i:IFilms):JSX.Element=>(
               <FilmCard key={i.imdbID} data={i} move={move} />
              ))}
            </Flex>
          </Box>
       </OptimisticContext.Provider>
  )
}

export default FilmMapCard