
import { createLogo } from '@/components/libs/create/logo';
import { ILogo } from '@/components/libs/types/type';
import BanButton from '@/components/ui/views/home/profile/admin/ban/cards/buttons/BanButton';
import { Box, Flex } from '@chakra-ui/react'
import React from 'react'

interface props {
  id:string,
  name:string
};

function BanUserCard({id,name}:props):JSX.Element {
  const lett:string = name[0].toUpperCase();
 const {one,two}:ILogo = createLogo();
  return (
    <Flex w="100%"  
     color="white"
     alignItems="center"
     justifyContent="space-between"
     mb={2} mt={2}>
      <Flex gap={5}
       alignItems="center">
        <Box w={12}
         background={`linear-gradient(45deg,${one},${two})`}
         textAlign='center'
         borderRadius='50%'
         fontSize={22}
         fontWeight="bold"
         boxSizing="border-box"
         p='8px' h={12}>
          {lett}
        </Box>
        <Box fontSize={23} 
         color="white">
          {name}
        </Box>
      </Flex>
      <BanButton id={id} />
    </Flex>
  )
}

export default BanUserCard