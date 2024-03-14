import delFilm from '@/components/helpers/api/mutation/film/delFilm'
import { useStore } from '@/components/store/store'
import { IDelQuery, IStore, IUsers } from '@/components/types/type'
import { Box, Flex } from '@chakra-ui/react'
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'

interface props {
    _id:string
};

function DelFilmButton({_id}:props):JSX.Element {
  const {id,token,role}:IStore = useStore();
  const {invalidateQueries}:QueryClient = useQueryClient();
  const {mutate} = useMutation<unknown,IUsers,IDelQuery>({
    mutationFn:(arg:IDelQuery)=>delFilm(arg),
    onSuccess:()=>invalidateQueries({queryKey:['users']})
  });

  const removeFilm = ():void => {
    mutate({id,_id,token,role});
  };

  return (
    <Flex w='95%'
     justifyContent='end'
     pos='absolute'
     zIndex={101}
     top={0}
     m='auto'>
      <Box
       transform='rotate(45deg)'
       cursor='pointer'
       onClick={removeFilm}
       fontSize={34}>
        +
      </Box>
    </Flex>
  )
}

export default DelFilmButton