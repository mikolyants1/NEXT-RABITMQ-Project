import { CommContext } from '@/components/helpers/functions/context';
import createTime from '@/components/helpers/functions/create/time/createCommTime';
import { ICommContext } from '@/components/types/type';
import { Box, Flex } from '@chakra-ui/react'
import {memo, useContext} from 'react'

interface props {
  name:string,
  time:number,
  text:string
};

function CommFilmCard({name,text,time}:props):JSX.Element {
 const {answer} = useContext<ICommContext>(CommContext);
 const now:string = createTime(time);
  return (
    <Flex maxW='100%'
     alignItems='center'
     boxSizing='border-box'
     onClick={answer(`${name},`)}
     color='white'
     p={4}>
      <Box minW={100}
       textAlign='center'
       fontSize={20}>
         {name}
      </Box>
      <Flex minW={250}
       justifyContent='space-between'
       bg='rgb(80,80,80)'
       borderRadius={15}
       pl={2} pr={2}
       alignItems='center'
       fontSize={18}
       h={10}>
        <Box>
          {text}
        </Box>
        <Box>
         {now}
        </Box>
      </Flex>
    </Flex>
  )
}

export default memo(CommFilmCard)