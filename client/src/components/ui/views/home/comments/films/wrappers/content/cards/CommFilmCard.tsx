
import createTime from '@/components/libs/create/time/createCommTime';
import { ICommContext } from '@/components/libs/types/type';
import { CommContext } from '@/components/model/context/CommContext';
import { Box, Flex } from '@chakra-ui/react'
import {memo, useContext} from 'react'

interface props {
  username:string,
  time:number,
  text:string
};

function CommFilmCard({username,text,time}:props):JSX.Element {
 const {answer} = useContext<ICommContext>(CommContext);
 const now:string = createTime(time);
 
  return (
    <Flex maxW='100%'
     alignItems='center'
     boxSizing='border-box'
     onClick={answer(`${username},`)}
     color='white'
     p={4}>
      <Box minW={100}
       textAlign='center'
       fontSize={20}>
         {username}
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