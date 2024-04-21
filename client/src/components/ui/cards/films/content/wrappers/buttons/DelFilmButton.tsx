import delFilm from '@/components/api/mutation/film/delFilm'
import { useStore } from '@/components/model/store/store'
import {type IOptimisticContext,type IStore } from '@/components/libs/types/type'
import { Box, Flex } from '@chakra-ui/react'
import { useContext } from 'react'
import { OptimisticContext } from '@/components/model/context/OptimisticContext'
import { EFilmType } from '@/components/libs/enum/enum'

interface IProps {
  _id:string
};

function DelFilmButton({_id}:IProps):JSX.Element {
  const {id,token,role}:IStore = useStore();
  const {optimistic} = useContext<IOptimisticContext>(OptimisticContext);

  const removeFilm = async ():Promise<void> => {
     optimistic({
       type:EFilmType.DELETE,
       payload:_id
     });
    await delFilm({id,_id,token,role});
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