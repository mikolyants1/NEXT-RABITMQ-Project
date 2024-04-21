import { autoAbsolute } from '@/components/libs/style/animation';
import { Button, Flex } from '@chakra-ui/react'
import React, {type Dispatch,type SetStateAction } from 'react'

interface IProps {
   move:number,
   setMove:Dispatch<SetStateAction<number>>,
   length:number
}

function MoveCard({move,setMove,length}:IProps):JSX.Element {
  const updateMove = (type:string) => ():void => {
    setMove((prv:number)=>(
      type == ">" ? prv + 1 : prv - 1
    ));
  }

  const setAllow = (type:string):boolean => {
    const res:number = type == ">" ? (length - 1) : 0;
    return move == res;
  }

  return (
    <Flex w={540}
     justifyContent="space-between"
     alignItems="center"
     position="absolute"
     {...autoAbsolute}>
      {["<",">"].map((i:string):JSX.Element=>(
       <Button key={i} w="50px"
        h="50px" fontSize={30}
        borderRadius="50%" zIndex={101}
        bg="rgb(200,200,200)"
        onClick={updateMove(i)}
        isDisabled={setAllow(i)}>
         {i}
      </Button>
      ))}
    </Flex>
  )
}

export default MoveCard