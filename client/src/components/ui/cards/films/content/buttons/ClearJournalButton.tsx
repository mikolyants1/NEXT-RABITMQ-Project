"use client"

import clearFilm from '@/components/api/mutation/film/clearFilm'
import { useStore } from '@/components/model/store/store'
import { IOptimisticContext, IStore} from '@/components/libs/types/type'
import { Button, Flex } from '@chakra-ui/react'
import {memo, useContext} from 'react'
import { OptimisticContext } from '@/components/model/context/OptimisticContext'
import { EFilmType } from '@/components/libs/enum/enum'

function ClearJournalButton():JSX.Element {
  const {token,id,role}:IStore = useStore();
  const {optimistic} = useContext<IOptimisticContext>(OptimisticContext);

  const clear = async ():Promise<void> => {
    optimistic({
      type:EFilmType.CLEAR,
      payload:[]
    });
    await clearFilm({id,token,role});
  };

  return (
      <form action={clear}>
        <Flex w='95%'
         justifyContent='center'
         alignItems='center'
         m='20px auto 20px auto'>
          <Button w={200}
           color='white'
           colorScheme="red">
            clear journal
          </Button>
        </Flex>
      </form>
  )
}

export default memo(ClearJournalButton)