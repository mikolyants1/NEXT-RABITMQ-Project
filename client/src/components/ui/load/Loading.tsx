'use client'

import { Box, Flex } from "@chakra-ui/react";
import { useEffect, useState ,memo } from "react";

function Loader():JSX.Element {
  const [spin,setSpin] = useState<number>(0);

  useEffect(():void=>{
    setInterval(():void => {
      setSpin((prev:number)=>(
        prev == 360 ? 0 : prev + 10
      ));
    }, 50);
  },[])
    
  return (
    <Flex w='100%' mt="70px"
     justifyContent='center'>
      <Box w='100px' h='100px'
       borderRadius='50%'
       borderLeft='15px solid transparent'
       borderTop='15px solid white'
       borderBottom='15px solid white'
       borderRight='15px solid white'
       rotate={`${spin}deg`}
       />
    </Flex>
  );
}
export default memo(Loader);