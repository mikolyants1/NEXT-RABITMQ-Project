'use client'

import { IFilms } from '@/components/libs/types/type'
import { Flex } from '@chakra-ui/react'
import React, { useContext, useOptimistic } from 'react'
import FilmCard from './content/FilmCard'
import ClearJournalButton from './content/buttons/ClearJournalButton';
import { DelContext } from '@/components/model/context/DelContext'
import { OptimisticContext } from '@/components/model/context/OptimisticContext'
import { optimisticAction } from '@/components/model/actions/optimistic/optimisticAction'

interface props {
    data:IFilms[];
};

function FilmMapCard({data}:props):JSX.Element {
  const isDel = useContext<boolean>(DelContext);
  const [optimistic,setOptimistic] = useOptimistic(data,optimisticAction);

  return (
     <OptimisticContext.Provider
      value={{optimistic:setOptimistic}}>
      <Flex w='100%'
       alignItems='center'
       flexWrap='wrap'
       justifyContent='center'
       gap={10}>
        {optimistic.map((i:IFilms,idx:number):JSX.Element=>(
         <FilmCard key={i.Plot} data={i} idx={idx} />
        ))}
      </Flex>
      {isDel&&<ClearJournalButton />}
    </OptimisticContext.Provider>
  )
}

export default FilmMapCard