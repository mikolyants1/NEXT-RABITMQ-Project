import delFilm from '@/components/helpers/mutation/film/delFilm'
import { useStore } from '@/components/store/store'
import { IDelQuery } from '@/components/types/type'
import { Box, Button, Flex } from '@chakra-ui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'

interface props {
    _id:string
};

function DelFilmButton({_id}:props):JSX.Element {
  const {id,token} = useStore();
  const {invalidateQueries} = useQueryClient();
  const {mutate:removeFilm} = useMutation({
    mutationFn:(arg:IDelQuery)=>delFilm(arg),
    onSuccess:()=>invalidateQueries({queryKey:['users']})
  });

  const del = ():void => {
    removeFilm({id,_id,token});
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
        onClick={del}
        fontSize={34}>
          +
       </Box>
    </Flex>
  )
}

export default DelFilmButton