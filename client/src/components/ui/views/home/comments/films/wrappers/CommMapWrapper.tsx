import { Flex, useMediaQuery } from "@chakra-ui/react";
import { memo } from "react";

interface props {
    children:JSX.Element,
    length:number
}

function CommMapWrapper({children,length}:props):JSX.Element {
    const [isSmall] = useMediaQuery('(max-width: 700px)');
     return (
       <Flex h={500}
        justifyContent='center'
        w={isSmall ? '100%' : '70%'}
        alignItems={length ? "normal" : "center"}
        overflowY='scroll'
        m='10px auto'>
          {children}
       </Flex>
     )
   }

   export default memo(CommMapWrapper)